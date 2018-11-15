export default function resolveParameterizedPath(path, params) {
  let matchedPath = path;
  for (const [key, value] of Object.entries(params)) {
    matchedPath = matchedPath.replace(':' + key, value);
  }
  return matchedPath;
}
