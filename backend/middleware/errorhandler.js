
 
const errorHandler = (err, req, res, next) => {
    
// Image file size exceeding error Handler 
 if (err.code === 'LIMIT_FILE_SIZE') {
    return res.json({ success: false, message: "File too large. Max size is 5MB." });
  }
  res.status(500).json({ success: false, message: err.message || "Something went wrong" });
};

export default errorHandler;