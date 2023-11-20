/*
 * Copyright (c) 2023 The Ontario Institute for Cancer Research. All rights reserved
 *
 * This program and the accompanying materials are made available under the terms of
 * the GNU Affero General Public License v3.0. You should have received a copy of the
 * GNU Affero General Public License along with this program.
 *  If not, see <http://www.gnu.org/licenses/>.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
 * OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT
 * SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
 * INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED
 * TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS;
 * OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER
 * IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN
 * ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

import bodyParser from 'body-parser';
import cors from 'cors';
import errorHandler from 'error-handler';
import express from 'express';
import ExpressLogger from 'express-logger';

import { AppConfig } from './config.js';
import logger from './logger.js';
import ConsentCompletionRouter from './routers/consentCompletion.js';
import ConsentQuestionRouter from './routers/consentQuestions.js';
import ClinicianInviteRouter from './routers/invites.js';
import ParticipantResponseRouter from './routers/participantResponses.js';
import ParticipantRouter from './routers/participants.js';
import StatusRouter from './routers/status.js';
import SwaggerRouter from './routers/swagger.js';
import UserRouter from './routers/user.js';
import WizardRouter from './routers/wizard.js';

const App = (config: AppConfig) => {
	const app = express();

	if (process.env.NODE_ENV === 'development') {
		app.use(
			cors({
				origin: 'http://localhost:3000',
				optionsSuccessStatus: 200,
			}),
		);
	}

	app.set('port', config.express.port);
	app.use(bodyParser.json());

	app.use(ExpressLogger({ logger }));

	// set up routers
	app.use('/api-docs', SwaggerRouter);

	app.use('/consent-completion', ConsentCompletionRouter);
	app.use('/consent-questions', ConsentQuestionRouter);
	app.use('/invites', ClinicianInviteRouter);
	app.use('/participant-responses', ParticipantResponseRouter);
	app.use('/participants', ParticipantRouter);
	app.use('/status', StatusRouter);
	app.use('/user', UserRouter);
	app.use('/wizard', WizardRouter);

	// Error Handler should be last function added so that
	// it can capture thrown errors from all previous handlers
	app.use(errorHandler({ logger }));

	return app;
};

export default App;
