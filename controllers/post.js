import express from 'express';
import mongoose from 'mongoose';
import { useDispatch } from 'react-redux';
import JournalSchema from '../models/journal.js';

const router = express.Router();

export const getPosts = async (req, res) => {
    const { page } = req.query;
    const dispatch = useDispatch();
    try {
        const LIMIT = 8;
        const startIndex = (Number(page) - 1) * LIMIT; // get the starting index of every page
        dispatch({ type: FETCH_POST, payload: { post: data } });
        const total = await JournalSchema.countDocuments({});
        const posts = await JournalSchema.find().sort({ _id: -1 }).limit(LIMIT).skip(startIndex);
        dispatch({ type: START_LOADING });
        res.json({ data: posts, currentPage: Number(page), numberOfPages: Math.ceil(total / LIMIT)});
    } catch (error) {    
        res.status(404).json({ message: error.message });
    }
}




export const getPost = async (req, res) => { 
    const { id } = req.params;

    try {
        const post = await JournalSchema.findById(id);
        dispatch({ type: FETCH_BY_CREATOR, payload: { data } });
        dispatch({ type: END_LOADING });
        res.status(200).json(post);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createPost = async (req, res) => {
    const post = req.body;

    const newPostMessage = new JournalSchema({ ...post, creator: req.userId, createdAt: new Date().toISOString() })

    try {
        await newPostMessage.save();

        res.status(201).json(newPostMessage);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const updatePost = async (req, res) => {
    const { id } = req.params;
    const { title, message, creator, selectedFile, tags } = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    const updatedPost = { creator, title, message, tags, selectedFile, _id: id };

    await JournalSchema.findByIdAndUpdate(id, updatedPost, { new: true });

    res.json(updatedPost);
}

export const deletePost = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    await JournalSchema.findByIdAndRemove(id);

    res.json({ message: "Post deleted successfully." });
}

export default router;