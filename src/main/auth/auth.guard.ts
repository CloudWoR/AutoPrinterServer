// import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
// import { Observable } from 'rxjs';

// @Injectable()
// export class AuthGuard implements CanActivate {
//   canActivate(
//     context: ExecutionContext,
//   ): boolean | Promise<boolean> | Observable<boolean> {
//     console.log('canActivate: ', context);
//     // throw new Error('Method not implemented.');
//     const request = context.switchToHttp().getRequest();
//     return this.ValidateRequest(request);
//   }

//   ValidateRequest(request: unknown) {
//     console.log('request: ', request);
//     return false;
//   }
// }
