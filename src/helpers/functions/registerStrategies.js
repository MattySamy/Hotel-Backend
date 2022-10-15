import passport from 'passport';
import JWTStrategy from '../strategies/jwt.strategy.js';
export default function registerStrategies() {
	passport.use('jwt', JWTStrategy);
}
