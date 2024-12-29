const Worker = require('../models/Worker');

// Tạo mới hồ sơ người giúp việc
exports.createWorker = async (req, res) => {
  try {
    const worker = new Worker(req.body);
    await worker.save();
    res.status(201).json(worker);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
// Route: Lấy thông tin worker theo ID
exports.getWorkersid = async (req, res) => {
    try {
      const worker = await Worker.findById(req.params.id);
      if (!worker) {
        return res.status(404).json({ message: 'Worker not found' });
      }
      res.json(worker);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };
// Lấy danh sách tất cả người giúp việc
exports.getWorkers = async (req, res) => {
  try {
    const workers = await Worker.find();
    res.status(200).json(workers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Cập nhật hồ sơ người giúp việc
exports.updateWorker = async (req, res) => {
  try {
    const worker = await Worker.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!worker) return res.status(404).json({ error: 'Worker not found' });
    res.status(200).json(worker);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Xóa hồ sơ người giúp việc
exports.deleteWorker = async (req, res) => {
  try {
    const worker = await Worker.findByIdAndDelete(req.params.id);
    if (!worker) return res.status(404).json({ error: 'Worker not found' });
    res.status(200).json({ message: 'Worker deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
