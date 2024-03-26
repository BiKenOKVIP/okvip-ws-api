const Project = require("../models/Project");

const projectController = {
  getAllProjects: async (req, res) => {
    try {
      const projects = await Project.find();

      const message =
        projects.length > 0
          ? "Lấy danh sách projects thành công!!!"
          : "Danh sách projects rỗng!!!";

      res.status(200).json({
        message,
        data: projects,
      });
    } catch (error) {
      res.status(404).json({ error: "Lỗi lấy danh sách Project!!!" });
    }
  },

  deleteProject: async (req, res) => {
    try {
      const project = await Project.findByIdAndDelete(req.params.id);
      res.status(200).json({
        error: project ? 1 : 2,
        message: project
          ? "Xóa Project thành công!!!"
          : "Xóa Project thất bại!!!",
        data: project,
      });
    } catch (error) {
      res.status(404).json({ error: "Không tìm thấy Project này!!!" });
    }
  },

  updateProject: async (req, res) => {
    try {
      let newProject = { updatedTime: Date.now(), ...req.body };
      let updatedProject = await Project.findOneAndUpdate(
        { _id: req.params.id },
        newProject
      );

      if (!updatedProject) {
        res.status(404).json({ error: "Không tìm thấy Project này!!!" });
      } else {
        res.status(200).json({ success: "Cập nhật thành công!!!" });
      }
    } catch (error) {
      res.status(404).json({ error: "Xảy ra lỗi khi cập nhật!!!" });
    }
  },

  insertProject: async (req, res) => {
    try {
      let project = new Project(req.body);
      project.createdTime = Date.now();
      let newProject = await project.save();
      res
        .status(200)
        .json({ success: "Tạo project thành công!!!", data: newProject });
    } catch (error) {
      res.status(404).json({ error: "Lỗi khi tạo project!!!" });
    }
  },
};

module.exports = projectController;
