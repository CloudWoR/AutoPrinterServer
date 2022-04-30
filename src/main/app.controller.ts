import { User } from './users/users.service';
import { AuthService } from './auth/auth.service';
import { Controller, Get, Inject, Post, Request } from '@nestjs/common';
import { AppService } from './app.service';
import { IpcInvoke } from './transport';
import { WebContents } from 'electron';
import { Public } from './auth/constants';

@Controller()
export class AppController {
    constructor(
        private readonly appService: AppService,
        private readonly authService: AuthService,
        @Inject('WEB_CONTENTS') private readonly webContents: WebContents,
    ) {
        setTimeout(() => {
            this.webContents.send('reply-msg', '延迟发送');
        }, 5000);
    }

    @IpcInvoke('msg')
    public async handleSendMsg(msg: string): Promise<string> {
        // this.webContents.send('reply-msg', 'this is msg from webContents.send');
        return `The main process received your message: ${msg} at time: ${this.appService.getTime()}`;
    }

    @Get()
    public test() {
        return 'test';
    }

    @Post('auth/login')
    @Public()
    async login(@Request() req: User) {
        return this.authService.login(req);
    }
}
