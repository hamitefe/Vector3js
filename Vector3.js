/**
 * A lightweight, minimal vector library
 * Contains operations:
 * - Negate
 * - Add
 * - Subtract
 * - Reflect
 * - Multiply
 * - Scale
 * - Divide
 * - Scale
 * - Cross Product
 * - Dot Product
 *
 * Static methods return a copy without modifying
 * the original vector but instance methods overwrite
 * the current vector
 *
 * @example
 * let vec = Vector3.UNIT_X;
 * let negated = Vector3.negate(vec)
 * let copy = negated.clone()
 * negated.add(Vector3.UNIT_X)
 * // vec: 1, 0, 0
 * // negated: 0, 0, 0
 * // copy: -1,0 0
 *
 * @example
 * //Chaining operators
 * let vec = Vector3.UNIT_Y;
 *
 * vec
 *  .negate()                  //0, -1, 0
 *  .add(Vector3.UNIT_X)       // 1, -1, 0
 *  .subtract(Vector3.UNIT_Z)  // 1, -1, -1
 *  .negate()                  // (-1, 1, 1)
 *  .normalize()               // (0.57735,0.57735,0.57735)
 */


class Vector3 {
    x;
    y;
    z;

    static UNIT_X   = Object.freeze(new Vector3(1,0,0));
    static UNIT_Y   = Object.freeze(new Vector3(0,1,0));
    static UNIT_Z   = Object.freeze(new Vector3(0,0,1));
    static MINUS_X   = Object.freeze(new Vector3(-1,0,0));
    static MINUS_Y   = Object.freeze(new Vector3(0,-1,0));
    static MINUS_Z   = Object.freeze(new Vector3(0,0,-1));
    static ONE      = Object.freeze(new Vector3(1,1,1));
    static ZERO     = Object.freeze(new Vector3(0,0,0));
    static MINUS_ONE= Object.freeze(new Vector3(-1,-1,-1));
    static EPSILON = Object.freeze(1e-6);

    /**
     *
     * @param {number?} x
     * @param {number?} y
     * @param {number?} z
     */
    constructor(x, y, z) {
        if (x==null){
            x = 0;
        }
        if (y==null){
            y= 0;
        }
        if (z==null){
            z = 0;
        }
        this.x = x;
        this.y = y;
        this.z = z;
    }

    /**
     * @returns {Vector3} A clone of the original vector
     */
    clone(){
        return new Vector3(this.x, this.y, this.z);
    }

    /**
     * negates the current vector
     * @returns {Vector3}
     */
    negate(){
        this.x *=-1;
        this.y *=-1;
        this.z *=-1;
        return this;
    }

    /**
     * Adds the x vector or the components to the vector
     * @param x {Vector3|number}
     * @param y {?number}
     * @param z {?number}
     * @returns {Vector3}
     */
    add(x,y,z){
        if (x instanceof Vector3) {
            this.x += x.x;
            this.y += x.y;
            this.z += x.z;
            return this;
        }

        this.x += x;
        this.y += y;
        this.z += z;
        return this;
    }

    /**
     * Subtracts the x vector or the components from the vector
     * @param x {Vector3|number}
     * @param y {?number}
     * @param z {?number}
     * @returns {?Vector3}
     */
    subtract(x,y,z){
        if (x instanceof Vector3) {
            this.x -= x.x;
            this.y -= x.y;
            this.z -= x.z;
            return this;
        }

        this.x -= x;
        this.y -= y;
        this.z -= z;
        return this;
    }

    /**
     * Scales the vector with the given scalar
     * @param x {number}
     * @returns {Vector3}
     */
    multiply(x) {

        this.x *= x;
        this.y *= x;
        this.z *= x;
        return this;
    }

    /**
     * Divides the given vector with the scalar
     * @param {number }x
     * @returns {Vector3}
     */
    divide(x){

        this.x /= x;
        this.y /= x;
        this.z /= x;
        return this;
    }

    /**
     * Scales the vector component-wise-
     * @param x {number|Vector3}
     * @param y {?number}
     * @param z {?number}
     * @returns {Vector3}
     *
     * @example
     * //using components
     * let vector = new Vector3(120, 300, 90);
     * let result = Vector3.scale(vector, 1, 0, 0); //clears y and z components
     * @example
     * //using a vector
     * let vector = new Vector3(120, 300, 90);
     * let result = Vector3.scale(vector, Vector3.UNIT_X) //clears y and z components
     */
    scale(x,y,z){

        if (x instanceof Vector3) {
            this.x *= x.x;
            this.y *= x.y;
            this.z *= x.z;
            return this;
        }

        this.x *= x;
        this.y *= y;
        this.z *= z;
        return this;
    }

    /**
     * Performs dot product with the given vector
     * @param {Vector3} vector
     * @returns {number}
     */
    dot(vector) {
        return Vector3.dot(this, vector);
    }

    /**
     * Performs cross product with the given vector
     * @returns {?Vector3}
     * @param {Vector3} vector
     * @returns {Vector3}
     */
    cross(vector) {
        let result= Vector3.cross(this, vector);
        this.x = result.x;
        this.y = result.y;
        this.z = result.z;
        return this;
    }

    /**
     * Reflects the vector
     * @returns {?Vector3}
     * @see Vector3.reflect
     *
     */
    reflect(normal){
        let result = Vector3.reflect(this, normal)
        this.x = result.x;
        this.y = result.y;
        this.z = result.z;
        return this;
    }

    /**
     * Normalizes the vector by modifying the original vector
     * @returns {?Vector3}
     */
    normalize(){
        return this.divide(this.magnitude);
    }

    get sqrMagnitude() {
        return Vector3.sqrMagnitude(this);
    }

    get magnitude() {
        return Vector3.magnitude(this);
    }

    /**
     * Returns a normalized copy of the original vector
     * @returns {?Vector3}
     */
    get normalized(){
        return Vector3.divide(this,this.magnitude);
    }

    toString(){
        return `${this.x}, ${this.y}, ${this.z}`;
    }

    equals(other, epsilon = Vector3.EPSILON){
        return Vector3.equals(this,other,epsilon);
    }

    /**
     * Adds the x vector or the components to the vector (doesn't modify the original vector)
     * @param vector {Vector3}
     * @param x {Vector3|number}
     * @param y {?number}
     * @param z {?number}
     * @returns {?Vector3}
     */

    static add(vector, x, y, z) {
        if (x instanceof Vector3) {
          return new Vector3(vector.x + x.x, vector.y + x.y, vector.z + x.z);
        }
        return new Vector3(
            vector.x + x,
            vector.y + y,
            vector.z + z,
        );
    }

    /**
     * Subtracts the x vector or the components from the vector (doesn't modify the original vector)
     * @param vector {Vector3}
     * @param x {Vector3|number}
     * @param y {?number}
     * @param z {?number}
     * @returns {?Vector3}
     */
    static subtract(vector, x,y,z){
        if (x instanceof Vector3){
          return new Vector3(vector.x-x.x, vector.y-x.y,vector.z-x.z);
        }

        return new Vector3(vector.x-x, vector.y-y, vector.z-z);
    }

    /**
     * Divides the given vector with the scalar
     * @param {Vector3} vector
     * @param {number }x
     * @returns {Vector3}
     */
    static divide(vector,x){
        return new Vector3(vector.x/x, vector.y/x, vector.z/x);
    }

    /**
     * Scales the vector with the given scalar (doesn't modify the original vector)
     * @param vector {Vector3}
     * @param x {number}
     * @returns {Vector3}
     */
    static multiply(vector, x) {
        return new Vector3(vector.x * x, vector.y * x, vector.z * x);
    }

    /**
     * Scales the vector component-wise (doesn't modify the original vector)
     * @param vector
     * @param x {number|Vector3}
     * @param y {?number}
     * @param z {?number}
     * @returns {Vector3}
     *
     * @example
     * //using components
     * let vector = new Vector3(120, 300, 90);
     * let result = Vector3.scale(vector, 1, 0, 0); //clears y and z components
     * @example
     * //using a vector
     * let vector = new Vector3(120, 300, 90);
     * let result = Vector3.scale(vector, Vector3.UNIT_X) //clears y and z components
     */
    static scale(vector, x, y, z) {
        if (x instanceof Vector3) {
          return new Vector3(vector.x * x.x, vector.y * x.y, vector.z * x.z);
        }

        return new Vector3(vector.x*x,vector.y*y,vector.z*z);
    }

    /**
     * Returns the squared magnitude of a vector
     * @param vector {Vector3}
     * @returns {number}
     */
    static sqrMagnitude(vector) {
        return vector.x * vector.x + vector.y * vector.y + vector.z * vector.z;
    }

    /**
     * Returns the magnitude of a vector
     * @param vector {Vector3}
     * @returns {number}
     */
    static magnitude(vector) {
        return Math.sqrt(Vector3.sqrMagnitude(vector));
    }

    /**
     * Performs dot product on two vectors
     * @param vec1
     * @param vec2
     * @returns {number}
     */
    static dot(vec1, vec2) {
        return vec1.x * vec2.x + vec1.y * vec2.y + vec1.z * vec2.z;
    }

    /**
     * Reflects a vector across a line/axis defined by the given direction vector.
     * This reflection "flips" the vector to the opposite side of the axis.
     *
     * Note: The axis parameter defines the axis of reflection itself (not the
     * normal of a mirror plane). The vector is reflected across this axis, with
     * components parallel to the axis preserved and components perpendicular
     * to the axis inverted
     * @param vector {Vector3}
     * @param axis {Vector3}
     * @returns {Vector3}
     *
     * @example
     * Vector3.reflect(Vector3.UNIT_X, UNIT_Y) //equals to MINUS_X
     */
    static reflect(vector, axis){
        const axisNormalized = Vector3.divide(axis,axis.magnitude);
        const parallel = axisNormalized.multiply(vector.dot(axisNormalized));
        const perpendicular = Vector3.subtract(vector,parallel);
        return parallel.subtract(perpendicular);
    }

    /**
     * Returns the distance between two vectors
     *
     * @param vec1 {Vector3}
     * @param vec2 {Vector3}
     * @returns {number}
     */
    static distance(vec1, vec2){
        return Vector3.subtract(vec1,vec2).magnitude;
    }


    /**
     * Returns the squared distance between two vectors
     *
     * @param vec1 {Vector3}
     * @param vec2 {Vector3}
     * @returns {number}
     */
    static sqrDistance(vec1, vec2){
        return Vector3.subtract(vec1,vec2).sqrMagnitude;
    }

    /**
     * Returns the cross product of 2 vectors
     *
     * @param vec1 {Vector3}
     * @param vec2 {Vector3}
     * @returns {Vector3} result
     *
     * @example
     * let unitY = Vector3.cross(Vector3.UNIT_X, UNIT_Z)
     */
    static cross(vec1, vec2) {
        return new Vector3(
          vec1.y * vec2.z - vec1.z * vec2.y,
          vec1.z * vec2.x - vec1.x * vec2.z,
          vec1.x * vec2.y - vec1.y * vec2.x,
        );
    }
    /**
     * Clamps the components of the vector between the given range (doesn't modify the original vector)
     *
     * @param {Vector3} vector the vector to clamp
     * @param {Vector3 | Number} x1 minX or the min Vector3
     * @param {Vector3 | Number} y1 minY or the max Vector3
     * @param z1 {?number} minZ
     * @param x2 {?number} maxX
     * @param y2 {?number} maxY
     * @param z2 {?number} maxZ
     * @returns {Vector3} the clamped vector
     * @example
     * //using generic components
     * let vec = new Vector3(5, 3, 0)
     * console.log(Vector3.clamp(vec, 0,0,0, 1,1,1)
     *
     * @example
     * //using min-max vectors
     * console.log(Vector3.clamp(vec, Vector3.ZERO, Vector3.ONE))
     **/
    static clamp(vector, x1,y1,z1,x2,y2,z2){
        if (x1 instanceof Vector3){
            if (!(y1 instanceof Vector3)){
                throw new Error("Either use min and max vectors or 6 components")

            }



            return new Vector3(
                Math.max(Math.min(vector.x, y1.x),x1.x),
                Math.max(Math.min(vector.y, y1.y),x1.y),
                Math.max(Math.min(vector.z, y1.z),x1.z),
            )
        }

        return new Vector3(
            Math.max(Math.min(vector.x, x2),x1),
            Math.max(Math.min(vector.y, y2),y1),
            Math.max(Math.min(vector.z, z2),z1),
        )
    }


    /**
     * Minimizes the components of the vector under the given components (doesn't modify the original vector)
     *
     * @param {Vector3} vector the vector to min
     * @param {Vector3|number} x the min vector or the x component
     * @param {?number} y the y component
     * @param {?number} z the z component
     * @returns {Vector3} the clamped vector
     * @example
     * //using generic components
     * let vec = new Vector3(5, 3, 0)
     * console.log(Vector3.clamp(vec,1,1,1)
     *
     * @example
     * //using a min vector
     * console.log(Vector3.min(vec, Vector3.ONE))
     **/
    static min(vector, x,y,z){
        if (!(x instanceof Vector3)){
            return new Vector3(
                Math.min(vector.x,x),
                Math.min(vector.y,y),
                Math.min(vector.z,z)
            );
        }

        return new Vector3(
            Math.min(vector.x,x.x),
            Math.min(vector.y,x.y),
            Math.min(vector.z,x.z)
        )
    }

    /**
     * Maximizes the components of the vector above the given components (doesn't modify the original vector)
     *
     * @param {Vector3} vector the vector to min
     * @param {Vector3|number} x the min vector or the x component
     * @param {?number} y the y component
     * @param {?number} z the z component
     * @returns {Vector3} the clamped vector
     * @example
     * //using generic components
     * let vec = new Vector3(5, 3, 0)
     * console.log(Vector3.max(vec, 1,1,1)
     *
     * @example
     * //using a max vector
     * console.log(Vector3.clamp(vec, Vector3.ONE))
     **/
    static max(vector, x,y,z){
        if (!(x instanceof Vector3)){
            return new Vector3(
                Math.max(vector.x,x),
                Math.max(vector.y,y),
                Math.max(vector.z,z),
            )
        }

        return new Vector3(
            Math.max(vector.x,x.x),
            Math.max(vector.y,x.y),
            Math.max(vector.z,x.z),
        )
    }

    /**
     * @param {Vector3} vector
     * @returns {Vector3} a negated copy of the original vector
     */
    static negate(vector){
        return new Vector3(
            -vector.x,
            -vector.y,
            -vector.z,
        )
    }

    static equals(vec1, vec2, epsilon = Vector3.EPSILON){
        return (
            Math.abs(vec1.x-vec2.x) <= epsilon &&
            Math.abs(vec1.y-vec2.y) <= epsilon &&
            Math.abs(vec1.z-vec2.z) <= epsilon
        );
    }
}