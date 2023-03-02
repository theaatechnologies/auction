
export function sendError(res: any, e: any){
    res.status(e.statusCode).json({message: e.message});
}