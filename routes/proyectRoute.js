const express = require('express');
const rutas = express.Router();
const proyectModel = require('../models/proyect');

rutas.get('/listar', async (req, res) =>{
    try {
        const proy = await proyectModel.find();
        // console.log(tareas);
        res.json(proy);
    }
    catch(error){
        res.status(404).json({mensaje: error.message});
    }
});

rutas.post('/agregar', async (req, res) =>{
    const newProyect = new proyectModel({
        CodeProyect: req.body.CodeProyect,
        ProjectName : req.body.ProjectName,
        Description 	:	req.body.Description 		,
        Status            : req.body.Status            ,
        StartDate         : req.body.StartDate         ,
        EndDate           : req.body.EndDate           ,
        Manager           : req.body.Manager           ,
        Progress          : req.body.Progress          ,
        Priority          : req.body.Priority          ,
        Budget            : req.body.Budget            ,
        ActualCost        : req.body.ActualCost        ,
        AssignedResources : req.body.AssignedResources ,
        RisksIssues       : req.body.RisksIssues       ,
        Comments          : req.body.Comments          ,
        Client            : req.body.Client            ,
        Category          : req.body.Category          ,
        LastUpdate        : req.body.LastUpdate        ,
        ReviewDate        : req.body.ReviewDate 
    });
    try {
        const saveProyect = await newProyect.save();
        res.status(201).json(saveProyect);
        
    } catch(error){
        res.status(400).json({mensaje: error.message});
    }
});

rutas.put('/editar/:id', async (req, res) =>{
    try {
        const updateProyect = await proyectModel.findByIdAndUpdate(req.params.id, req.body, { new: true});
        res.status(201).json(updateProyect);
        
    } catch(error){
        res.status(400).json({mensaje: error.message});
    }
});

rutas.delete('/eliminar/:id', async (req, res) =>{
    try {
        const deleteProyect = await proyectModel.findByIdAndDelete(req.params.id);
        res.json({mensaje: 'Tarea eliminada correctamente'});
        
    } catch(error){
        res.status(400).json({mensaje: error.message});
    }
});
//consultas ----------------------
// - Listar proyectos segun estado
rutas.get('/proyectStatus/:status', async (req, res) =>{
    try {
        console.log(req.params.id);
        const tareasPrioridad = await proyectModel.find({ Status: req.params.status});
        res.json(tareasPrioridad);
    }
    catch(error){
        res.status(404).json({mensaje: error.message});
    }
});

//Listar por fecha de inicio  ingresada en request

rutas.post('/listarPorFecha', async (req, res) =>{
    const newProyect = new proyectModel({       
        StartDate         : req.body.StartDate
    });
    try {
        const tareasPrioridad = await proyectModel.find({ StartDate: req.body.StartDate});
        res.json(tareasPrioridad);
        
    } catch(error){
        res.status(400).json({mensaje: error.message});
    }
});
// listar proyectos que finalizan el mes actual
rutas.get('/listarProyectosFinalizanMesActual', async (req, res) =>{
    const today = new Date();
    const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

    try {
        const tareasPrioridad = await proyectModel.find({
            EndDate: {
                $gte: firstDayOfMonth,
                $lte: lastDayOfMonth
            }
        });
        
        res.json(tareasPrioridad);
    }
    catch(error){
        res.status(404).json({mensaje: error.message});
    }
});
module.exports = rutas;