/*
 * ${HEADER}
 */

// provides
goog.provide('X.shaders');

// requires
goog.require('X.base');
goog.require('X.exception');



/**
 * Create a pair of shaders which consists of a vertex and a fragment shader.
 * 
 * @constructor
 * @extends {X.base}
 */
X.shaders = function() {

  //
  // call the standard constructor of X.base
  goog.base(this);
  
  //
  // class attributes
  
  /**
   * @inheritDoc
   * @const
   */
  this._className = 'shader';
  
  /**
   * The vertex shader source of this shader pair. By default, a basic shader
   * supporting vertex positions and vertex colors is defined.
   * 
   * @type {!string}
   * @protected
   */
  this._vertexShaderSource = '';
  var t = '';
  t += 'attribute vec3 vertexPosition;\n';
  t += 'attribute vec3 vertexNormal;\n';
  t += 'attribute vec3 vertexColor;\n';
  t += 'attribute vec2 vertexTexturePos;\n';
  t += '\n';
  t += 'uniform mat4 view;\n';
  t += 'uniform mat4 perspective;\n';
  t += 'uniform mat4 objectTransform;\n';
  t += 'uniform bool useObjectColor;\n';
  t += 'uniform vec3 objectColor;\n';
  t += 'uniform float objectOpacity;\n';
  t += 'uniform mat3 normal;\n';
  t += '\n';
  t += 'varying lowp vec4 fragmentColor;\n';
  t += 'varying vec2 fragmentTexturePos;\n';
  t += '\n';
  t += 'void main(void) {\n';
  t += '  vec3 lightingWeighting = vec3(0.0, 0.0, 1.0);\n';
  t += '  vec3 transformedNormal = normal * vertexNormal;\n';
  t += '  float dLW = max(dot(transformedNormal, lightingWeighting ), 0.0);\n';
  t += '  gl_Position = perspective * view * objectTransform * vec4(vertexPosition, 1.0);\n';
  t += '  fragmentTexturePos = vertexTexturePos;\n';
  t += '  if (useObjectColor) {\n';
  t += '    fragmentColor = vec4(objectColor*dLW,objectOpacity);\n';
  t += '  } else {\n';
  t += '    fragmentColor = vec4(vertexColor*dLW,objectOpacity);\n';
  t += '  }\n';
  t += '}\n';
  this._vertexShaderSource = t;
  
  /**
   * The fragment shader source of this shader pair. By default, a basic shader
   * supporting fragment colors is defined.
   * 
   * @type {!string}
   * @protected
   */
  this._fragmentShaderSource = '';
  var t2 = '';
  t2 += '#ifdef GL_ES\n';
  t2 += 'precision highp float;\n';
  t2 += '#endif\n';
  t2 += '\n';
  t2 += 'varying lowp vec4 fragmentColor;\n';
  t2 += 'varying vec2 fragmentTexturePos;\n';
  t2 += 'uniform bool useTexture;\n';
  t2 += 'uniform sampler2D textureSampler;\n';
  t2 += '\n';
  t2 += 'void main(void) {\n';
  t2 += ' if (useTexture) {\n';
  t2 += '   gl_FragColor = texture2D(textureSampler,';
  t2 += '   vec2(fragmentTexturePos.s,fragmentTexturePos.t));\n';
  t2 += ' } else {\n';
  t2 += '   gl_FragColor = fragmentColor;\n';
  t2 += ' }\n';
  t2 += '}\n';
  this._fragmentShaderSource = t2;
  
  /**
   * The string to access the position inside the vertex shader source.
   * 
   * @type {!string}
   * @protected
   */
  this._positionAttribute = 'vertexPosition';
  
  /**
   * The string to access the position inside the vertex shader source.
   * 
   * @type {!string}
   * @protected
   */
  this._normalAttribute = 'vertexNormal';
  
  /**
   * The string to access the color inside the vertex shader source.
   * 
   * @type {!string}
   * @protected
   */
  this._colorAttribute = 'vertexColor';
  
  /**
   * The string to access the texture position inside the vertex shader source.
   * 
   * @type {!string}
   * @protected
   */
  this._texturePosAttribute = 'vertexTexturePos';
  

  /**
   * The string to access the opacity value inside the vertex shader source.
   * 
   * @type {!string}
   * @protected
   */
  this._lighting = 'lighting';
  
  /**
   * The string to access the view matrix inside the vertex shader source.
   * 
   * @type {!string}
   * @protected
   */
  this._viewUniform = 'view';
  
  /**
   * The string to access the perspective matrix inside the vertex shader
   * source.
   * 
   * @type {!string}
   * @protected
   */
  this._perspectiveUniform = 'perspective';
  

  /**
   * The string to access the transform matrix inside the vertex shader source.
   * 
   * @type {!string}
   * @protected
   */
  this._objectTransformUniform = 'objectTransform';
  

  this._useObjectColorUniform = 'useObjectColor';
  

  /**
   * The string to access the objectColor uniform inside the vertex shader
   * source.
   * 
   * @type {!string}
   * @protected
   */
  this._objectColorUniform = 'objectColor';
  

  /**
   * The string to access the objectOpacity uniform inside the vertex shader
   * source.
   * 
   * @type {!string}
   * @protected
   */
  this._objectOpacityUniform = 'objectOpacity';
  
  // TODO comments
  
  this._normalUniform = 'normal';
  
  this._useTextureUniform = 'useTexture';
  
  this._textureSamplerUniform = 'textureSampler';
  
};
// inherit from X.base
goog.inherits(X.shaders, X.base);


/**
 * Get the vertex shader source of this shader pair.
 * 
 * @return {!string} The vertex shader source.
 */
X.shaders.prototype.vertex = function() {

  return this._vertexShaderSource;
  
};


/**
 * Get the fragment shader source of this shader pair.
 * 
 * @return {!string} The fragment shader source.
 */
X.shaders.prototype.fragment = function() {

  return this._fragmentShaderSource;
  
};


/**
 * Get the vertex position attribute locator.
 * 
 * @return {!string} The vertex position attribute locator.
 */
X.shaders.prototype.position = function() {

  return this._positionAttribute;
  
};


/**
 * Get the vertex position attribute locator.
 * 
 * @return {!string} The vertex position attribute locator.
 */
X.shaders.prototype.normal = function() {

  return this._normalAttribute;
  
};


/**
 * Get the vertex color attribute locator.
 * 
 * @return {!string} The vertex color attribute locator.
 */
X.shaders.prototype.color = function() {

  return this._colorAttribute;
  
};


/**
 * Get the view uniform locator.
 * 
 * @return {!string} The view uniform locator.
 */
X.shaders.prototype.view = function() {

  return this._viewUniform;
  
};


/**
 * Get the perspective uniform locator.
 * 
 * @return {!string} The perspective uniform locator.
 */
X.shaders.prototype.perspective = function() {

  return this._perspectiveUniform;
  
};


/**
 * Get the transform uniform locator.
 * 
 * @return {!string} The transform uniform locator.
 */
X.shaders.prototype.objectTransform = function() {

  return this._objectTransformUniform;
  
};


/**
 * TODO
 */
X.shaders.prototype.useObjectColor = function() {

  return this._useObjectColorUniform;
  
};


/**
 * Get the objectColor uniform locator.
 * 
 * @return {!string} The objectColor uniform locator.
 */
X.shaders.prototype.objectColor = function() {

  return this._objectColorUniform;
  
};


/**
 * Get the objectOpacity uniform locator.
 * 
 * @return {!string} The objectColor uniform locator.
 */
X.shaders.prototype.objectOpacity = function() {

  return this._objectOpacityUniform;
  
};


/**
 * Get the normal uniform locator
 * 
 * @return {String|null} The normal uniform locator.
 */
X.shaders.prototype.normalUniform = function() {

  return this._normalUniform;
  
};


/**
 * Get the lightning uniform locator.
 * 
 * @return {!string} The opacity uniform locator.
 */
X.shaders.prototype.lighting = function() {

  return this._lighting;
  
};


/**
 * TODO
 * 
 * @returns {String}
 */
X.shaders.prototype.texturePos = function() {

  return this._texturePosAttribute;
  
};


/**
 * TODO
 * 
 * @returns {String}
 */
X.shaders.prototype.textureSampler = function() {

  return this._textureSamplerUniform;
  
};


/**
 * TODO
 */
X.shaders.prototype.useTexture = function() {

  return this._useTextureUniform;
  
};


/**
 * Checks if the configured shaders object is valid.
 * 
 * @return {boolean} TRUE or FALSE depending on success.
 * @throws {X.exception} An exception if the shader is invalid.
 */
X.shaders.prototype.validate = function() {

  // check if the sources are compatible to the attributes and uniforms
  
  var t = 31337;
  
  t = this._vertexShaderSource.search(this._positionAttribute);
  
  if (t == -1) {
    
    throw new X.exception(
        'Fatal: Could not validate shader! The positionAttribute was bogus.');
    
  }
  
  t = this._vertexShaderSource.search(this._normalAttribute);
  
  if (t == -1) {
    
    throw new X.exception(
        'Fatal: Could not validate shader! The normalAttribute was bogus.');
    
  }
  
  // t = this._vertexShaderSource.search(this._colorAttribute);
  //  
  // if (t == -1) {
  //    
  // throw new X.exception(
  // 'Fatal: Could not validate shader! The colorAttribute was bogus.');
  //    
  // }
  
  t = this._vertexShaderSource.search(this._opacityAttribute);
  
  if (t == -1) {
    
    throw new X.exception(
        'Fatal: Could not validate shader! The opacityAttribute was bogus.');
    
  }
  
  t = this._vertexShaderSource.search(this._perspectiveUniform);
  
  if (t == -1) {
    
    throw new X.exception(
        'Fatal: Could not validate shader! The perspectiveUniform was bogus.');
    
  }
  
  t = this._vertexShaderSource.search(this._viewUniform);
  
  if (t == -1) {
    
    throw new X.exception(
        'Fatal: Could not validate shader! The viewUniform was bogus.');
    
  }
  
  t = this._vertexShaderSource.search(this._objectTransformUniform);
  
  if (t == -1) {
    
    throw new X.exception(
        'Fatal: Could not validate shader! The transformUniform was bogus.');
    
  }
  
  t = this._vertexShaderSource.search(this._useObjectColorUniform);
  
  if (t == -1) {
    
    throw new X.exception(
        'Fatal: Could not validate shader! The useObjectColorUniform was bogus.');
    
  }
  
  t = this._vertexShaderSource.search(this._objectColorUniform);
  
  if (t == -1) {
    
    throw new X.exception(
        'Fatal: Could not validate shader! The objectColorUniform was bogus.');
    
  }
  
  t = this._vertexShaderSource.search(this._objectOpacityUniform);
  
  if (t == -1) {
    
    throw new X.exception(
        'Fatal: Could not validate shader! The objectOpacityUniform was bogus.');
    
  }
  
  t = this._vertexShaderSource.search(this._normalUniform);
  
  if (t == -1) {
    
    throw new X.exception(
        'Fatal: Could not validate shader! The normalUniform was bogus.');
    
  }
  
  t = this._vertexShaderSource.search(this._lighting);
  
  if (t == -1) {
    
    throw new X.exception(
        'Fatal: Could not validate shader! The lighting was bogus.');
    
  }
  
  t = this._vertexShaderSource.search(this._texturePosAttribute);
  
  if (t == -1) {
    
    throw new X.exception(
        'Fatal: Could not validate shader! The texturePosAttribute was bogus.');
    
  }
  
  t = this._fragmentShaderSource.search(this._textureSamplerUniform);
  
  if (t == -1) {
    
    throw new X.exception(
        'Fatal: Could not validate shader! The textureSamplerUniform was bogus.');
    
  }
  
  t = this._fragmentShaderSource.search(this._useTextureUniform);
  
  if (t == -1) {
    
    throw new X.exception(
        'Fatal: Could not validate shader! The useTextureUniform was bogus.');
    
  }
  
  return true;
  
};

// TODO: texture, lightning etc.

// export symbols (requiered for advanced compilation)
goog.exportSymbol('X.shaders', X.shaders);
goog.exportSymbol('X.shaders.prototype.vertex', X.shaders.prototype.vertex);
goog.exportSymbol('X.shaders.prototype.fragment', X.shaders.prototype.fragment);
goog.exportSymbol('X.shaders.prototype.position', X.shaders.prototype.position);
goog.exportSymbol('X.shaders.prototype.color', X.shaders.prototype.color);
goog.exportSymbol('X.shaders.prototype.view', X.shaders.prototype.view);
goog.exportSymbol('X.shaders.prototype.perspective',
    X.shaders.prototype.perspective);
goog.exportSymbol('X.shaders.prototype.opacity', X.shaders.prototype.opacity);
goog.exportSymbol('X.shaders.prototype.validate', X.shaders.prototype.validate);
