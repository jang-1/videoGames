const db = require("../db");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");

const getPosts = (req, res) => {
  const sql = 'SELECT * FROM posts';
  db.query(sql, [], (err, results) => {
    if (err) {
      console.error('Błąd podczas pobierania recenzji: ', err);
      res.status(500).json({ error: 'Wystąpił błąd podczas pobierania recenzji' });
      return;
    }

    if (results.length === 0) {
      res.status(404).json({ message: 'Nie znaleziono recenzji' });
      return;
    }

    res.status(200).json(results);
  });
};

const getPost = (req, res) => {
  const postId = req.params.id;
  const sql = 'SELECT `username`, `title`, `desc`, `img`, `created_at`, `uid` FROM users u JOIN posts p ON u.id = p.uid WHERE p.id = ?';
  db.query(sql, [postId], (err, result) => {
    if (err) {
      console.error('Błąd podczas pobierania recenzji: ', err);
      res.status(500).json({ error: 'Wystąpił błąd podczas pobierania recenzji' });
      return;
    }

    if (result.length === 0) {
      res.status(404).json({ message: 'Nie znaleziono recenzji dla podanego ID' });
      return;
    }

    res.status(200).json(result[0]);
  });
};

const addPost = (req, res) => {
  const { title, desc, img, uid } = req.body;
  const currentDate = new Date().toISOString().slice(0, 19).replace('T', ' ');
  const sql = 'INSERT INTO posts (title, `desc`, img, created_at, uid) VALUES (?, ?, ?, ?, ?)';
  db.query(sql, [title, desc, img.filename, currentDate, uid], (err, result) => {
    if (err) {
      console.error('Błąd podczas dodawania recenzji: ', err);
      res.status(500).json({ error: 'Wystąpił błąd podczas dodawania recenzji' });
      return;
    }

    res.status(201).json({ message: 'Recenzja dodana pomyślnie', postId: result.insertId });
  });
};

const deletePost = (req, res) => {
  const postId = req.params.id;
  const sql = 'DELETE FROM posts WHERE id = ?';
  db.query(sql, [postId], (err, result) => {
    if (err) {
      console.error('Błąd podczas usuwania recenzji: ', err);
      res.status(500).json({ error: 'Wystąpił błąd podczas usuwania recenzji' });
      return;
    }

    res.status(200).json({ message: 'Recenzja usunięta pomyślnie' });
  });
};

const updatePost = (req, res) => {
  const postId = req.params.id;
  const { title, desc, img, uid } = req.body;

  

  // Pobranie aktualnych danych posta z bazy danych
  const getCurrentPostQuery = 'SELECT title, `desc`, img, uid FROM posts WHERE id = ?';
  db.query(getCurrentPostQuery, [postId], (err, results) => {
    if (err) {
      console.error('Błąd podczas pobierania aktualnego posta: ', err);
      res.status(500).json({ error: 'Wystąpił błąd podczas pobierania aktualnego posta' });
      return;
    }

    if (results.length === 0) {
      res.status(404).json({ message: 'Nie znaleziono posta o podanym ID' });
      return;
    }

    console.log(img)

    const currentPost = results[0];

    // Sprawdzenie, które pola zostały zmienione
    const updatedFields = {};
    if (title !== currentPost.title) {
      updatedFields.title = title;
    }
    if (desc !== currentPost.desc) {
      updatedFields.desc = desc;
    }
    if (img !== currentPost.img && img !== undefined) {
      updatedFields.img = img;
    }
    if (uid !== currentPost.uid) {
      updatedFields.uid = uid;
    }

    // Jeśli nie ma żadnych zmian, zwróć odpowiedź
    if (Object.keys(updatedFields).length === 0) {
      res.status(200).json({ message: 'Brak zmian do zapisania' });
      return;
    }

    // Aktualizacja tylko zmienionych pól w bazie danych
    const currentDate = new Date().toISOString().slice(0, 19).replace('T', ' ');
    updatedFields.updated_at = currentDate
    const updateQuery = 'UPDATE posts SET ? WHERE id = ?';
    db.query(updateQuery, [updatedFields, postId], (err, result) => {
      if (err) {
        console.error('Błąd podczas aktualizacji posta: ', err);
        res.status(500).json({ error: 'Wystąpił błąd podczas aktualizacji posta' });
        return;
      }

      res.status(200).json({ message: 'Post zaktualizowany pomyślnie' });
    });
  });
};


module.exports = { getPosts, getPost, addPost, deletePost, updatePost };
