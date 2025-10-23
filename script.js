body {
  margin: 0;
  overflow: hidden;
  background: black;
  color: #00ff9f;
  font-family: 'Courier New', monospace;
}

canvas {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 0;
}

.center-box {
  position: absolute;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  color: #b8ffd2;
  background: rgba(0, 0, 0, 0.4);
  padding: 40px 60px;
  border-radius: 15px;
  box-shadow: 0 0 20px #00ff9f55;
  z-index: 1;
}

h1 {
  font-size: 1.8em;
  margin-bottom: 10px;
}

.subtext {
  font-size: 0.9em;
  margin-bottom: 25px;
  color: #7cffb3;
}

.menu a {
  color: #00ff9f;
  margin: 0 15px;
  text-decoration: none;
  font-weight: bold;
  transition: 0.3s;
}

.menu a:hover {
  text-shadow: 0 0 10px #00ff9f, 0 0 20px #00ff9f;
}

/* GALLERY */
.gallery {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 25px;
  padding: 80px 20px;
  z-index: 1;
  position: relative;
}

.card {
  width: 220px;
  height: 220px;
  overflow: hidden;
  border-radius: 10px;
  box-shadow: 0 0 15px #00ff9f77;
  transition: all 0.3s ease;
}

.card:hover {
  box-shadow: 0 0 25px #00ff9f;
  transform: scale(1.05);
}

.card img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Sections */
.section {
  display: none;
}

.section.active {
  display: block;
}

.hidden {
  display: none;
}
