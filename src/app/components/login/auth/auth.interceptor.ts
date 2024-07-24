import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const jwtToken = getJwtToken();
  if (jwtToken) {
    console.log("interceptor ", jwtToken);
    var cloned = req.clone({
      setHeaders: {
        Authorization: `Bearer ${jwtToken}`,
      },
    });

    return next(cloned);
  }
  return next(req);
};

function getJwtToken(): string | null {
  let tokens: any = localStorage.getItem("TOKEN");
  console.log("interceptor, token:", localStorage.getItem("TOKEN"));
  if (!tokens) return null;
  return tokens;
}
