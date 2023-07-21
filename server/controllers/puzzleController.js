const Puzzle = require("../models/Puzzle");

module.exports = {
    findAllPuzzles: (req, res) => {
        Puzzle.find()
            .then(allPuzzles => res.json(allPuzzles))
            .catch(err => res.status(400).json(err))
    },

    findOnePuzzle: (req, res) => {
        Puzzle.find({_id: req.params.id})
            .then(onePuzzle => res.json(onePuzzle))
            .catch(err => res.status(400).json(err))
    },

    createPuzzle: (req, res) => {
        Puzzle.create(req.body)
            .then(newPuzzle => res.json(newPuzzle))
            .catch(err => res.status(400).json(err))
    },

    updatePuzzle: (req, res) => {
        Puzzle.findByIdAndUpdate({_id: req.params.id}, req.body, {new: true, runValidators: true})
            .then(updatedPuzzle => res.json(updatedPuzzle))
            .catch(err => res.status(400).json(err))
    },

    deletePuzzle: (req, res) => {
        Puzzle.findByIdAndDelete({_id: req.params.id})
            .then(deletedPuzzle => res.json(deletedPuzzle))
            .catch(err => res.status(400).json(err))
    },
}