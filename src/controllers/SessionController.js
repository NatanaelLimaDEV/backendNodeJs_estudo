// Metodos: index, show, store, update, destroy
/*
index: listagem de sessões
show: quando queremos listar uma UNICA sessão
store: criar uma sessão
update: quando queremos alterar alguma sessão
destroy: quando queremos deletar uma sessão
*/

import User from "../models/User";
import * as Yup from "yup";

class SessionController {
    async store(req, res){
        const schema = Yup.object().shape({
            email: Yup.string().email().required()
        });

        const { email } = req.body

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: "Validação falhou" });
        }

        // Verificar se o usuario existe
        let user = await User.findOne({ email })

        if(!user){
            user = await User.create({ email })
        }
        
        return res.json(user)
    }
}

export default new SessionController();