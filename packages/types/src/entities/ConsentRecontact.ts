/*
 * Copyright (c) 2024 The Ontario Institute for Cancer Research. All rights reserved
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

import { z } from 'zod';

import { ConsentQuestionId } from './ConsentQuestion.js';
import { OptionalName, OptionalPhoneNumber } from './fields/index.js';

const { RECONTACT__FUTURE_RESEARCH, RECONTACT__SECONDARY_CONTACT } = ConsentQuestionId.enum;

export const ConsentRecontactBase = z.object({
	[RECONTACT__FUTURE_RESEARCH]: z.boolean(),
	[RECONTACT__SECONDARY_CONTACT]: z.boolean(),
	secondaryContactFirstName: OptionalName,
	secondaryContactLastName: OptionalName,
	secondaryContactPhoneNumber: OptionalPhoneNumber,
});

export const hasRequiredSecondaryContactInfo = ({
	requireSecondaryContactInfo,
	secondaryContactFirstName,
	secondaryContactLastName,
	secondaryContactPhoneNumber,
}: {
	requireSecondaryContactInfo: boolean;
	secondaryContactFirstName?: string;
	secondaryContactLastName?: string;
	secondaryContactPhoneNumber?: string;
}) => {
	const allSecondaryContactInfoDefined =
		secondaryContactFirstName !== undefined &&
		secondaryContactLastName !== undefined &&
		secondaryContactPhoneNumber !== undefined;
	return requireSecondaryContactInfo ? allSecondaryContactInfoDefined : true;
};
