export const getProfile = (req, res) => {
    console.log(req.cookies);
    res.json({message: "Bienvenido"});
}