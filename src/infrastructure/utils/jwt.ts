import { sign, verify, JwtPayload } from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

class Jwt {

     private authSecret:string ;

     constructor(){
          this.authSecret = process.env.auth_secret || ''
     }
     generateToken(id: string, role: string) {
          try {
               let playload = { id, role }
               const token = sign(playload, this.authSecret, { expiresIn: '10d' })
               return token
          } catch (error) {
               console.error('Error while generating JWT token:', error);
               throw error;
          }
     }
     
     verifyToken(token: string): JwtPayload | null {
          try {
               const decoded = verify(token, this.authSecret) as JwtPayload;
               return decoded;
          } catch (error) {
               console.error('Error while verifying JWT token:', error);
               return null;
          }
     }
}

export default Jwt