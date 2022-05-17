const express = require('express')
const router = express.Router()
const Notes = require('../models/Notes');
const fetchuser = require('../middleware/fetchuser')
const { body, validationResult } = require('express-validator');

router.get('/getnotes', fetchuser, async (req, res) => {
   try {
      const notes = await Notes.find({ user: req.user.id })
      res.json(notes);
   } catch (error) {
      console.error(error.message);
      res.status(500).send("Error has occured");
   }
})

router.post('/addnotes', fetchuser, [
   body('title', 'Enter a title').isLength({ min: 3 }),
   body('description', 'Add a valid description').isLength({ min: 5 })
], async (req, res) => {
   try {
      const { title, description, tag } = req.body
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
         return res.status(400).json({ errors: errors.array() });
      }
      const note = new Notes({
         title, description, tag, user: req.user.id

      })
      const saveNote = await note.save();
      res.json(saveNote);

   } catch (error) {
      console.error(error.message);
      res.status(500).send("Error has occured");
   }
})

router.put('/updatenotes/:id', fetchuser, async (req, res) => {
   const { title, description, tag } = req.body;
   try {
      const newNote = {};
      if (title) {
         newNote.title = title;
      }
      if (description) {
         newNote.description = description;
      }
      if (tag) {
         newNote.tag = tag;
      }
      let note = await Notes.findById(req.params.id)
      if (!note) {
         return res.status(404).send("Not found");
      }
      if (note.user.toString() !== req.user.id) {
         return res.status(401).send("Not allowed");
      }
      note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
      res.json({ note });
   }
   catch (error) {
      console.error(error.message);
      res.status(500).send("Error has occured");
   }
})

router.delete('/deletenotes/:id', fetchuser, async (req, res) => {
   try {
      let note = await Notes.findById(req.params.id)
      if (!note) {
         return res.status(404).send("Not found");
      }
      if (note.user.toString() !== req.user.id) {
         return res.status(401).send("Not allowed");
      }
      note = await Notes.findByIdAndDelete(req.params.id)
      res.json({ 'Success': "Note has been deleted!", note: note });
   } catch (error) {
      console.error(error.message);
      res.status(500).send("Error has occured");
   }
})
module.exports = router