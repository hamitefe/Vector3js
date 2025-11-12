# Vector3

A lightweight, minimal 3D vector mathematics library for JavaScript with no dependencies.

## Features

- ✨ Simple and intuitive API
- 🔄 Method chaining support
- 📦 Zero dependencies
- 🎯 Both static and instance methods
- ⚡ Optimized for performance
- 🛡️ Includes common vector constants

## Installation

Simply include the `Vector3` class in your project:

```javascript
// Copy the Vector3 class into your project
```

## Quick Start

```javascript
// Create vectors
const vec1 = new Vector3(1, 2, 3);
const vec2 = new Vector3(4, 5, 6);

// Use constants
const right = Vector3.UNIT_X;  // (1, 0, 0)
const up = Vector3.UNIT_Y;     // (0, 1, 0)

// Perform operations
const sum = Vector3.add(vec1, vec2);
const normalized = vec1.normalized;
const distance = Vector3.distance(vec1, vec2);
```

## API Reference

### Constructor

```javascript
new Vector3(x, y, z)
```

Creates a new Vector3. All parameters default to 0 if not provided.

### Constants

Pre-defined frozen vector constants:

- `Vector3.UNIT_X` - (1, 0, 0)
- `Vector3.UNIT_Y` - (0, 1, 0)
- `Vector3.UNIT_Z` - (0, 0, 1)
- `Vector3.MINUS_X` - (-1, 0, 0)
- `Vector3.MINUS_Y` - (0, -1, 0)
- `Vector3.MINUS_Z` - (0, 0, -1)
- `Vector3.ONE` - (1, 1, 1)
- `Vector3.ZERO` - (0, 0, 0)
- `Vector3.MINUS_ONE` - (-1, -1, -1)
- `Vector3.EPSILON` - 1e-6

### Instance Methods

Instance methods modify the original vector and return `this` for chaining.

#### Basic Operations

- `clone()` - Returns a copy of the vector
- `negate()` - Negates the vector
- `add(x, y, z)` or `add(vector)` - Adds to the vector
- `subtract(x, y, z)` or `subtract(vector)` - Subtracts from the vector
- `multiply(scalar)` - Scales the vector uniformly
- `divide(scalar)` - Divides the vector uniformly
- `scale(x, y, z)` or `scale(vector)` - Scales component-wise
- `normalize()` - Normalizes the vector to unit length

#### Vector Operations

- `dot(vector)` - Returns dot product (scalar)
- `cross(vector)` - Performs cross product
- `reflect(axis)` - Reflects across an axis
- `equals(other, epsilon)` - Checks equality within tolerance

#### Properties

- `magnitude` - Returns the length of the vector
- `sqrMagnitude` - Returns the squared length (faster, no sqrt)
- `normalized` - Returns a normalized copy without modifying original
- `toString()` - Returns string representation

### Static Methods

Static methods return new vectors without modifying inputs.

#### Basic Operations

- `Vector3.add(vector, x, y, z)` or `Vector3.add(vector, otherVector)`
- `Vector3.subtract(vector, x, y, z)` or `Vector3.subtract(vector, otherVector)`
- `Vector3.multiply(vector, scalar)`
- `Vector3.divide(vector, scalar)`
- `Vector3.scale(vector, x, y, z)` or `Vector3.scale(vector, scaleVector)`
- `Vector3.negate(vector)`

#### Measurements

- `Vector3.magnitude(vector)` - Returns length
- `Vector3.sqrMagnitude(vector)` - Returns squared length
- `Vector3.distance(vec1, vec2)` - Returns distance between vectors
- `Vector3.sqrDistance(vec1, vec2)` - Returns squared distance

#### Vector Math

- `Vector3.dot(vec1, vec2)` - Dot product
- `Vector3.cross(vec1, vec2)` - Cross product
- `Vector3.reflect(vector, axis)` - Reflects vector across axis

#### Utility

- `Vector3.clamp(vector, min, max)` - Clamps components
- `Vector3.min(vector, x, y, z)` - Component-wise minimum
- `Vector3.max(vector, x, y, z)` - Component-wise maximum
- `Vector3.equals(vec1, vec2, epsilon)` - Equality check

## Usage Examples

### Method Chaining

```javascript
let vec = Vector3.UNIT_Y;

vec
  .negate()                  // (0, -1, 0)
  .add(Vector3.UNIT_X)       // (1, -1, 0)
  .subtract(Vector3.UNIT_Z)  // (1, -1, -1)
  .negate()                  // (-1, 1, 1)
  .normalize();              // (-0.57735, 0.57735, 0.57735)
```

### Static vs Instance Methods

```javascript
// Static method - returns new vector, doesn't modify original
let vec = new Vector3(1, 0, 0);
let negated = Vector3.negate(vec);
console.log(vec);      // (1, 0, 0) - unchanged
console.log(negated);  // (-1, 0, 0)

// Instance method - modifies original
vec.negate();
console.log(vec);      // (-1, 0, 0) - changed
```

### Component-wise Scaling

```javascript
let vector = new Vector3(120, 300, 90);

// Using components
let result1 = Vector3.scale(vector, 1, 0, 0);  // (120, 0, 0)

// Using a vector
let result2 = Vector3.scale(vector, Vector3.UNIT_X);  // (120, 0, 0)
```

### Vector Reflection

```javascript
// Reflect across Y axis
let reflected = Vector3.reflect(Vector3.UNIT_X, Vector3.UNIT_Y);
// Result: (-1, 0, 0)
```

### Cross Product

```javascript
// Get perpendicular vector
let unitY = Vector3.cross(Vector3.UNIT_Z, Vector3.UNIT_X);
// Result: (0, 1, 0)
```

### Clamping

```javascript
let vec = new Vector3(5, 3, -2);

// Using component values
let clamped1 = Vector3.clamp(vec, 0, 0, 0, 1, 1, 1);  // (1, 1, 0)

// Using min/max vectors
let clamped2 = Vector3.clamp(vec, Vector3.ZERO, Vector3.ONE);  // (1, 1, 0)
```

## Performance Tips

- Use `sqrMagnitude` and `sqrDistance` when you don't need the exact distance (avoids expensive `sqrt` operation)
- Use static methods when you need to preserve the original vector
- Use instance methods and chaining when you want to modify in place

## Important Notes

- **Instance methods** modify the vector and return `this` for chaining
- **Static methods** create and return new vectors without modifying inputs
- Reflection reflects across an axis (not across a plane's normal)
- Default epsilon for equality checks is `1e-6`

## License

Feel free to use this library in your projects!
