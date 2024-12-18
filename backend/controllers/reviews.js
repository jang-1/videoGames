const db = require("../db");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken")

const addReview = (req, res) => {
  const { userId, gameId, review, title } = req.body;

  try {
          // Pobierz aktualną datę i czas
          const currentDate = new Date().toISOString().slice(0, 19).replace('T', ' ');

          const insertReviewSql = 'INSERT INTO reviews (user_id, game_id, review_text, title, createdAt) VALUES (?, ?, ?, ?, ?)';
          db.query(insertReviewSql, [userId, gameId, review, title, currentDate], (insertReviewErr, insertReviewResult) => {
              if (insertReviewErr) {
                  console.error('Błąd podczas zapisywania recenzji do bazy danych: ', insertReviewErr);
                  res.status(500).json({ error: 'Wystąpił błąd podczas zapisywania recenzji' });
                  return;
              }
              console.log('Recenzja została zapisana do bazy danych');
              res.status(200).json({ message: 'Recenzja została dodana pomyślnie' });
          });

  } catch (error) {
      console.error('Błąd podczas dodawania recenzji: ', error);
      res.status(500).json({ error: 'Wystąpił błąd podczas dodawania recenzji' });
  }
};

const getReviews = (req, res) => {

const gameId = req.params.gameId;

  // Zapytanie SQL do pobrania recenzji dla określonej gry
  const sql = 'SELECT r.id as reviewId, `username`, `email` ,`title`, `review_text`, `createdAt`, `updatedAt` ,`user_id` FROM users u JOIN reviews r ON u.id = r.user_id WHERE game_id = ?';
  db.query(sql, [gameId], (err, results) => {
    if (err) {
      console.error('Błąd podczas pobierania recenzji: ', err);
      res.status(500).json({ error: 'Wystąpił błąd podczas pobierania recenzji' });
      return;
    }

    // Jeśli nie znaleziono recenzji dla podanego ID gry
    if (results.length === 0) {
      res.status(200).json([]);
      return;
    }

    // Jeśli znaleziono recenzje, zwróć je w odpowiedzi
    res.status(200).json(results);
  });
};

const editReview = (req, res) => {
  const reviewId = req.params.reviewId;
  const { review_text, title } = req.body;

  // Sprawdź, czy istnieje recenzja o podanym ID
  const getReviewSql = 'SELECT * FROM reviews WHERE id = ?';
  db.query(getReviewSql, [reviewId], (err, results) => {
      if (err) {
          console.error('Błąd podczas pobierania recenzji: ', err);
          res.status(500).json({ error: 'Wystąpił błąd podczas pobierania recenzji' });
          return;
      }

      if (results.length === 0) {
          res.status(404).json({ message: 'Nie znaleziono recenzji o podanym ID' });
          return;
      }

      const currentDate = new Date().toISOString().slice(0, 19).replace('T', ' ');

      // Zaktualizuj recenzję
      const updateReviewSql = 'UPDATE reviews SET review_text = ?, title = ?, updatedAt = ? WHERE id = ?';
      db.query(updateReviewSql, [review_text, title, currentDate, reviewId], (updateErr, updateResult) => {
          if (updateErr) {
              console.error('Błąd podczas aktualizowania recenzji: ', updateErr);
              res.status(500).json({ error: 'Wystąpił błąd podczas aktualizowania recenzji' });
              return;
          }

          console.log('Recenzja została zaktualizowana pomyślnie');
          res.status(200).json({ message: 'Recenzja została zaktualizowana pomyślnie' });
      });
  });
};

const deleteReview = (req, res) => {
  const reviewId = req.params.reviewId;

  // Sprawdź, czy istnieje recenzja o podanym ID
  const getReviewSql = 'SELECT * FROM reviews WHERE id = ?';
  db.query(getReviewSql, [reviewId], (err, results) => {
      if (err) {
          console.error('Błąd podczas pobierania recenzji: ', err);
          res.status(500).json({ error: 'Wystąpił błąd podczas pobierania recenzji' });
          return;
      }

      if (results.length === 0) {
          res.status(404).json({ message: 'Nie znaleziono recenzji o podanym ID' });
          return;
      }

      // Usuń recenzję
      const deleteReviewSql = 'DELETE FROM reviews WHERE id = ?';
      db.query(deleteReviewSql, [reviewId], (deleteErr, deleteResult) => {
          if (deleteErr) {
              console.error('Błąd podczas usuwania recenzji: ', deleteErr);
              res.status(500).json({ error: 'Wystąpił błąd podczas usuwania recenzji' });
              return;
          }

          console.log('Recenzja została usunięta pomyślnie');
          res.status(200).json({ message: 'Recenzja została usunięta pomyślnie' });
      });
  });
};

module.exports = { addReview, getReviews, editReview, deleteReview };
