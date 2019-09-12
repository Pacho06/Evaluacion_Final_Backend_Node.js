var storage = require('../storage'),
    path    = require('path');

var routes = (app) => {
    app.get('/search', (req, res) => {
        storage.getDataAll()
            .then((data) => {
                res.json({ "error": false, "datos": data });
            })
            .catch((err) => {
                res.json({ "error": true, "datos": err });
            });
    });

    app.get('/filteroptions', (req, res) => {
        storage.getDataAll()
            .then((data) => {
                let ciudades = [];
                let tipos = [];
                data.forEach((key, idx) => {
                    if (ciudades.indexOf(key.Ciudad) < 0) {
                        ciudades.push(key.Ciudad);
                    }
                    if (tipos.indexOf(key.Tipo) < 0) {
                        tipos.push(key.Tipo);
                    }
                });
                res.json({ "error": false, "ciudades": ciudades, "tipos": tipos });
            })
            .catch((err) => {
                res.json({ "error": true, "err": err });
            });
    });

    app.get('/ciudad/:ciudadId/tipo/:tipoId/desde/:desdeVal/hasta/:hastaVal', (req, res) => {
        let params = req.params;
        let datos = [];
        storage.getDataAll()
            .then(data => {
                var auxi = [];
                var zzzz = [];
                var datos = [];

                auxi = data.slice();

                if (params.ciudadId != "todas") {
                    auxi.forEach((key, idx) => {
                        if (key.Ciudad == params.ciudadId) {
                            zzzz.push(key);
                        }
                    });
                } else {
                    zzzz = auxi.slice();
                }

                auxi = [];
                auxi = zzzz.slice();
                zzzz = [];

                if (params.tipoId != "todos") {
                    auxi.forEach((key, idx) => {
                        if (key.Tipo == params.tipoId) { zzzz.push(key); }
                    });
                } else {
                    zzzz = auxi.slice();
                }

                zzzz.forEach((key, idx) => {
                    let valor = parseInt(key.Precio.replace("$", "").replace(",", ""));
                    if (valor >= parseInt(params.desdeVal) && valor <= parseInt(params.hastaVal)) {
                        datos.push(key);
                    }
                });

                res.status(200).json({ datos, params });
            })
            .catch((err) => {
                res.json({ "error": true, "err": err });
            });
    });
};

module.exports = routes;