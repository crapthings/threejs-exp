#pragma glslify: snoise = require(glsl-noise/simplex/3d)

uniform float time;
uniform float progress;
varying vec2 vUv;
varying vec3 pos;

vec3 snoiseVec3 (vec3 x) {
  float s  = snoise(vec3(x));
  float s1 = snoise(vec3(x.y - 19.1 , x.z + 33.4 , x.x + 47.2));
  float s2 = snoise(vec3(x.z + 74.2 , x.x - 124.5 , x.y + 99.4));
  vec3 c = vec3(s , s1 , s2);
  return c;
}

vec3 curlNoise (vec3 p) {
  const float e = .1;
  vec3 dx = vec3(e   , 0.0 , 0.0);
  vec3 dy = vec3(0.0 , e   , 0.0);
  vec3 dz = vec3(0.0 , 0.0 , e  );

  vec3 p_x0 = snoiseVec3(p - dx);
  vec3 p_x1 = snoiseVec3(p + dx);
  vec3 p_y0 = snoiseVec3(p - dy);
  vec3 p_y1 = snoiseVec3(p + dy);
  vec3 p_z0 = snoiseVec3(p - dz);
  vec3 p_z1 = snoiseVec3(p + dz);

  float x = p_y1.z - p_y0.z - p_z1.y + p_z0.y;
  float y = p_z1.x - p_z0.x - p_x1.z + p_x0.z;
  float z = p_x1.y - p_x0.y - p_y1.x + p_y0.x;

  const float divisor = 1.0 / (2.0 * e);
  return normalize(vec3(x , y , z) * divisor);
}

void main () {
  vUv = uv;

  float strength = step(.9, max(abs(position.x - .5 * progress), abs(position.y - .5 * progress)));

  vec3 pos = position;
  vec3 distortion;

  distortion = curlNoise(vec3(
    0, //uv.x > .5 ? (cameraPosition.x - .5) * time : (cameraPosition.x + .5) * time,
    0, //strength, //position.y > .5 ? cameraPosition.y - 10. * time : cameraPosition.y + 10. * time,
    0 //position.z > .5 ? cameraPosition.z - 10. * time : cameraPosition.z + 10. * time
  ));

  // pos.z = uv.x >= .15 ? (cameraPosition.x - .5) * time * progress : (cameraPosition.x + .5) * time * progress;

  pos.z = uv.x >= .15 ? (cameraPosition.x - .5) * progress : (cameraPosition.x + .5) * progress;

  // pos.z -= (uv.y + 3.) * progress;

  // if (uv.x >= .15) {
  //   pos.z *= 2. * time;
  // }

  vec4 mvPosition = modelViewMatrix * vec4(pos * (progress), 1.);

  gl_PointSize = 10.;
  gl_Position = projectionMatrix * mvPosition;
  // gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.);
}

#pragma glslify: export(curlNoise)
