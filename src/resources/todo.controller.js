import {db} from '#utils/db.js';

async function index(req, res) {
    const result = await db.execute("SELECT * FROM todos");
    res.status(200).json({ todos: result.rows });
}

async function store(req, res) {
    const result = await db.execute({
        sql: "INSERT INTO todo (title, body, completed) value (?,?,?)",
        args: [req.body.title, req.body.body, 0]
    })
    res.status(201).json({ message: 'todo created'})
}

export default {index, store};