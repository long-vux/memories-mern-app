import PostMessage from '../models/postMessage.js';
import mongoose from 'mongoose';

export const getPosts = async (req, res) => {
    const {page} = req.query;
    try {
        const LIMIT = 8;
        const startIndex = (Number(page) - 1) * LIMIT;  
        const total = await PostMessage.countDocuments({});
        const posts = await PostMessage.find().sort({ _id: -1 }).limit(LIMIT).skip(startIndex);
        res.status(200).json({data: posts, currentPage: Number(page), numberOfPages: Math.ceil(total / LIMIT)});
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getPostsBySearch = async (req, res) => {
    const { searchQuery, tags } = req.query;
    try {
        let cleanTags;
        if (typeof tags === 'string' && tags.includes(',')) {
            cleanTags = tags.split(',').map(tag => tag.trim());
        } else {
            cleanTags = [tags].filter(tag => tag);
        }

        const title = searchQuery ? new RegExp(searchQuery, 'i') : null;
        const query = {
            $or: [
                { title: title },
                { tags: { $in: cleanTags } }
            ]
        }
        const posts = await PostMessage.find(query);
        res.json({ data: posts });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};



export const createPost = async (req, res) => {
    const post = req.body;
    const tags = post.tags.split(',');
    const cleanTags = tags.map((tag) => tag.trim());
    const newPost = new PostMessage({ ...post, tags: cleanTags, creator: req.userId, createdAt: new Date().toISOString() });
    try {
        await newPost.save();
        res.status(201).json(newPost);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const updatePost = async (req, res) => {
    const { id: _id } = req.params;
    const post = req.body;

    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that id');

    const updatedPost = await PostMessage.findByIdAndUpdate(_id, { ...post, _id }, { new: true });

    res.json(updatedPost);
}

export const deletePost = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that id');

    await PostMessage.findByIdAndDelete(id);

    res.json({ message: 'Post deleted successfully' });
}

export const likePost = async (req, res) => {
    const { id } = req.params;

    if (!req.userId) return res.json({ message: 'Unauthenticated' });

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that id');

    const post = await PostMessage.findById(id);

    if (post.likes.includes(req.userId)) {
        post.likes = post.likes.filter((id) => id !== String(req.userId));
    } else {
        post.likes.push(req.userId);
    }

    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true });

    res.json(updatedPost);
}