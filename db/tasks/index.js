const constants = require("../../constants")
const { pool } = require('../index')

const getTasks = async (limit, offset) => {
    return new Promise((resolve) => {
        pool.query(`SELECT * FROM tasks 
        WHERE is_deleted=false 
        ORDER BY created_at desc
        LIMIT $1 OFFSET $2`, [limit, offset], (error, results) => {
            if (error) {
                resolve({ "error": error, "records": [] })
                return
            }

            resolve({ "error": error, "records": results.rows })
        })
    })
}

const createTask = ({ title, description }) => {
    return new Promise(resolve => {
        pool.query(`INSERT INTO tasks (title, description, status, is_deleted, created_at, updated_at)
        VALUES ($1, $2, $3, false, NOW(), NOW()) RETURNING *`,
            [title, description, constants.OPEN], (error, results) => {
                if (error) {
                    resolve({
                        "error": error,
                        "message": `Failed to add task`
                    })
                    return
                }

                resolve({
                    "error": undefined,
                    "message": `Task added with ID: ${results.rows[0].task_id}`
                })
            })
    })

}

const updateTask = (id, updateColQuery) => {
    return new Promise(resolve => {
        let query = `UPDATE tasks SET ${updateColQuery.join(",")},
        updated_at=NOW() WHERE task_id = $1`

        console.log("update query", query)

        pool.query(
            query,
            [id],
            (error, _) => {
                if (error) {
                    resolve({
                        "error": error,
                        "message": `Failed to modify task with ID: ${id}`
                    })

                    return
                }

                resolve({ "error": undefined, "message": `Task modified with ID: ${id}` })
            }
        )
    })
}

const deleteTask = (id) => {
    return new Promise(resolve => {
        pool.query('UPDATE tasks SET is_deleted=true WHERE task_id = $1', [id],
            (error, _) => {
                if (error) {
                    resolve({ "error": error, "message": `Failed to delete task with ID: ${id}` })
                    return
                }

                resolve({ "error": undefined, "message": `Task deleted with ID: ${id}` })
            })
    })
}

const getTaskMetrics = (month, year) => {
    return new Promise(resolve => {
        let conds = []

        if (!!month && !!year) {
            conds.push(`and EXTRACT(MONTH FROM created_at) = '${month}'
             and EXTRACT(YEAR FROM created_at) = '${year}'`)
        }
        let cq = conds.join(conds, " ") || ""


        let query = `select 
        (
           select count(task_id) from tasks 
           where status='open' ${cq}
        ) as "open_tasks",
        (
           select count(task_id) from tasks 
           where status='in_progress' ${cq}
        ) as "in_progress_tasks",
        (
           select count(task_id) from tasks 
           where status='completed' ${cq}
        ) as "completed_tasks";`

        console.log("metric query", query)
        pool.query(query,
            (error, results) => {
                if (error) {
                    resolve({ "error": error, "record": {} })
                }

                resolve({ "error": undefined, "record": results.rows[0] })
            })
    })

}

module.exports = {
    getTasks,
    createTask,
    updateTask,
    deleteTask,
    getTaskMetrics,
}