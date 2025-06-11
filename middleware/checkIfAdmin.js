// ----> NEW <---- //

export function checkIfAdmin(req, res, next) {
  const user = req.user;

  if (!user) {
      return res.status(401).json({
        message: 'Not logged in' 
      });
  }

  if (user.role !== 'admin') {
      return res.status(403).json({ 
        message: 'Admins only' 
      });
  }

  next();
}