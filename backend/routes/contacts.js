const express = require("express");
const mysql = require("mysql");
const router = express.Router();

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "contacts",
  port: "3306",
});

router.post("/", (req, res) => {
  const { name, email, phone } = req.body;

  if (!name || !email || !phone) {
    return res.json({ error: "Tous les champs sont requis" });
  }

  const query = "INSERT INTO contact (name, email, phone) VALUE (?, ?, ?)";

  connection.query(query, [name, email, phone], (err, result) => {
    if (err) {
      console.error("Erreur lors de l'ajout du contact:", err);
      return res.json({ error: "Erreur lors de l'ajout du contact" });
    }

    // Envoyer une réponse de succès
    res.json({ message: "Nouveau contact ajouté avec succès" });
  });
});

router.get("/", (req, res) => {
  connection.query("SELECT * FROM contact", (err, result) => {
    if (err) {
      console.error("Erreur lors de la récuperation des contacts:", err);
      return res.json({ error: "Erreur lors de la récuperation des contacts" });
    }

    res.json(result);
  });
});

router.delete("/:id", (req, res) => {
  const id = req.params.id;
  const query = "DELETE FROM contact WHERE id = ?";
  connection.query(query, [id], (err, result) => {
    if (err) {
      console.error("Erreur lors de la suppresion du contacts", err);
      return res.json({ error: "Erreur lors de la suppresion du contacts" });
    }

    res.json({ message: "Contact supprimé avec succès" });
  });
});

module.exports = router;
