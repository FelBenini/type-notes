import axios from "axios"
import nookies from 'nookies'
const apiURL = process.env.API_URL

export class authService {
    static login = async (username: string, password: string) => {
        const { data } = await axios.post(`${apiURL}/login`, {
            username,
            password
        })
        return data.token
    }

    static getSession = async (ctx: any) => {
        const cookies = nookies.get(ctx)
        const { data } = await axios.get(`${apiURL}/session`, {
            headers: {
                'authorization': cookies['AUTHJWTKEY']
            }
        })
        return data.session
    }
}

export function withSession(funcao: any) {
    return async (ctx: any) => {
        try {
            const session = await authService.getSession(ctx);
            const modifiedCtx = {
                ...ctx,
                req: {
                    ...ctx.req,
                    session,
                }
            };
            return funcao(modifiedCtx);
        } catch (err) {
            return {
                redirect: {
                    permanent: false,
                    destination: '/',
                }
            }
        }
    }
}