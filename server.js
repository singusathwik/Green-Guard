const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('./models/user');
const Tree = require('./models/tree'); // Import the Tree model
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret'; // Set this in .env for security

const Threat = require('./models/threat');

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/green_guard', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('MongoDB Connected'))
    .catch((err) => console.error('MongoDB connection error:', err));

app.use(cors());
app.use(express.json());

// Registration endpoint
app.post('/register', async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const existing = await User.findOne({ $or: [{ username }, { email }] });
        if (existing) {
            return res.status(400).json({ success: false, message: "Username or email already exists" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ username, email, password: hashedPassword });
        await user.save();
        res.status(201).json({ success: true, message: "User registered successfully" });
    } catch (err) {
        res.status(500).json({ success: false, message: "Server error", error: err.message });
    }
});

// Login route
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json({ success: false, message: "Invalid credentials" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: "Invalid credentials" });
        }
        const token = jwt.sign(
            { id: user._id, username: user.username, role: user.role },
            JWT_SECRET,
            { expiresIn: '3h' }
        );
        res.json({
            success: true,
            message: "Login successful",
            user: { _id: user._id, username: user.username, email: user.email, role: user.role },
            token
        });
    } catch (err) {
        res.status(500).json({ success: false, message: "Server error" });
    }
});

// Dummy endpoints for frontend auth check
app.get('/api/read-cookie', (req, res) => {
    res.json({ screen: null });
});
app.get('/api/clear-cookie', (req, res) => {
    res.json({ success: true });
});

// JWT authentication middleware
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ success: false, message: 'Authentication token required' });
    }
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(403).json({ success: false, message: 'Invalid or expired token' });
    }
};

// Threat endpoints
app.get('/api/threats', authenticateToken, async (req, res) => {
    try {
        const threats = await Threat.find();
        res.json({ success: true, data: threats });
    } catch (err) {
        console.error('Error fetching threats:', err);
        res.status(500).json({ success: false, message: 'Server error', error: err.message });
    }
});

app.use('/api/notifications', require('./routes/notification_router'));


app.post('/api/threats', authenticateToken, async (req, res) => {
    console.log('POST /api/threats called, body:', req.body);
    const { type, description, location, coordinates, severity, reportedBy, image } = req.body;
    try {
        if (!type || !description || !location || !coordinates || !severity || !reportedBy) {
            console.error('Missing required fields');
            return res.status(400).json({ success: false, message: 'All required fields must be provided' });
        }
        if (!Array.isArray(coordinates) || coordinates.length !== 2 || coordinates.some(isNaN)) {
            console.error('Invalid coordinates format');
            return res.status(400).json({ success: false, message: 'Coordinates must be an array of two numbers' });
        }
        const threat = new Threat({
            type,
            description,
            location,
            coordinates,
            severity,
            reportedBy,
            image,
            status: 'Pending',
            reportedAt: new Date(),
        });
        await threat.save();
        console.log('Threat saved:', threat);
        res.status(201).json({ success: true, message: 'Threat reported successfully', data: threat });
    } catch (err) {
        console.error('Error reporting threat:', err);
        res.status(500).json({ success: false, message: 'Server error', error: err.message });
    }
});

// Replace the existing DELETE endpoint with this:
app.put('/api/threats/:id/resolve', authenticateToken, async (req, res) => {
    try {
        const { id } = req.params;
        const updatedThreat = await Threat.findByIdAndUpdate(
            id,
            { status: 'Resolved' },
            { new: true }
        );

        if (!updatedThreat) {
            return res.status(404).json({ success: false, message: 'Threat not found' });
        }

        res.json({
            success: true,
            message: 'Threat marked as resolved',
            data: updatedThreat
        });
    } catch (err) {
        console.error('Error resolving threat:', err);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: err.message
        });
    }
});



// Tree endpoints
app.get('/api/trees', authenticateToken, async (req, res) => {
    try {
        const trees = await Tree.find().populate('plantedBy', 'username');
        res.json({ success: true, data: trees });
    } catch (err) {
        console.error('Error fetching trees:', err);
        res.status(500).json({ success: false, message: 'Server error', error: err.message });
    }
});

app.post('/api/trees', authenticateToken, async (req, res) => {
    console.log('POST /api/trees called, body:', req.body);
    const { species, location, plantedBy, healthUpdates } = req.body; // Removed qrCode
    try {
        if (!species || !location || !plantedBy) {
            return res.status(400).json({ success: false, message: 'Species, location, and plantedBy are required' });
        }
        const tree = new Tree({
            species,
            location, // Now a string
            plantedBy,
            healthUpdates: healthUpdates || [],
        });
        await tree.save();
        console.log('Tree saved:', tree);
        res.status(201).json({ success: true, message: 'Tree added successfully', data: tree });
    } catch (err) {
        console.error('Error adding tree:', err);
        res.status(500).json({ success: false, message: 'Server error', error: err.message });
    }
});

// Delete a tree by ID
app.delete('/api/trees/:id', authenticateToken, async (req, res) => {
    try {
        const { id } = req.params;
        const deletedTree = await Tree.findByIdAndDelete(id);
        if (!deletedTree) {
            return res.status(404).json({ success: false, message: 'Tree not found' });
        }
        res.json({ success: true, message: 'Tree deleted successfully' });
    } catch (err) {
        console.error('Error deleting tree:', err);
        res.status(500).json({ success: false, message: 'Server error', error: err.message });
    }
});



// ✅ Use the router for all conservation activities endpoints
app.use('/api/conservation-activities', require('./routes/conservation_router'));

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});