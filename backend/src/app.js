const express = require("express");
const app = express();
const path = require("path");

const authRoutes = require("./routes/auth.routes");
const uploadRoutes = require("./routes/upload.routes");
const viewRoutes = require("./routes/view.routes");
const cors = require("cors");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../views"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

app.use("/", viewRoutes);

// ROUTES MOUNT
app.use("/api/auth", authRoutes);
app.use("/api/upload", uploadRoutes);

app.use((err, req, res, next) => {
	if (err) {
		return res.status(400).json({ message: err.message || "Request failed" });
	}
	next();
});

module.exports = app;