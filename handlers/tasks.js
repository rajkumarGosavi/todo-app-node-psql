const tasksDB = require('../db/tasks')

const getTasks = async (request, response) => {
    const page = parseInt(request.query.page) || 1; // Current page number
    const limit = parseInt(request.query.page_size) || 10; // Number of items per page
    const offset = (page - 1) * limit; // Offset for skipping items
    let res = await tasksDB.getTasks(limit, offset)
    console.log("!!!res", res)
    if (!!res["error"]) {
        response.status(500).send(`Something went wrong while fetching tasks`)
        return
    }

    response.status(200).json(res["records"])
}

const createTask = async (request, response) => {
    const { title, description } = request.body
    let res = await tasksDB.createTask({ title, description })
    if (!!res["error"]) {
        response.status(500).send(`Something went wrong while saving task`)
        return
    }

    response.status(201).send(res["message"])
}

const updateTask = async (request, response) => {
    const id = parseInt(request.params.id)
    const { title, description, status } = request.body

    let updateCols = {}
    if (!!title) {
        updateCols["title"] = title
    }
    if (!!description) {
        updateCols["description"] = description
    }
    if (!!status) {
        updateCols["status"] = status
    }

    if (!title && !description && !status) {
        response.status(400).send("Bad request pass atleast title, description, status to update")
        return
    }

    let updateColQuery = []

    for (const key in updateCols) {
        if (Object.hasOwnProperty.call(updateCols, key)) {
            const element = updateCols[key];
            updateColQuery.push(`${key}='${element}'`)
        }
    }

    let res = await tasksDB.updateTask(id, updateColQuery)
    if (!!res["error"]) {
        response.status(500).send(`Something went wrong while saving task`)
        return
    }

    response.status(200).send(res["message"])

}

const deleteTask = async (request, response) => {
    const id = parseInt(request.params.id)
    let res = await tasksDB.deleteTask(id)
    if (!!res["error"]) {
        response.status(500).send(`Something went wrong while saving task`)
        return
    }

    response.status(200).send(res["message"])
}

const getTaskMetrics = async (request, response) => {
    const month = parseInt(request.query.month);
    const year = parseInt(request.query.year);

    let res = await tasksDB.getTaskMetrics(month, year)
    if (res["error"]) {
        response.status(500).send("failed to get metrics for tasks")
        return
    }

    if (!!month && !!year) {
        response.status(200).json({
            "date": `${new Date(year, month - 1, 1).toLocaleString('default', { month: 'long' })} ${year}`,
            "metrics": res.record,
        })

        return
    }

    response.status(200).json(res["record"])
}

const rootHandler = async (_, response) => {
    response.json({ info: 'Welcome to Todo App' })
}


module.exports = {
    getTasks,
    createTask,
    updateTask,
    deleteTask,
    getTaskMetrics,
    rootHandler,
}