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

import { Prisma } from '../../src/generated/client/index.js';

const participants: Prisma.ParticipantCreateInput[] = [
	{
		id: 'cllgostgz000008l3fk0w',
		dateOfBirth: new Date('1956-05-12'),
		participantEmailAddress: 'homer.simpson@example.com',
		participantOhipFirstName: 'Homer',
		participantOhipLastName: 'Simpson',
		participantPhoneNumber: '6475551234',
		participantPreferredName: 'Homer',
		keycloakId: '7ecea917-2a8e-4a65-b4cb-3c52f3f3a020',
	},
	{
		id: 'cllgoufw3000208l3c6gy',
		dateOfBirth: new Date('1986-07-14'),
		participantEmailAddress: 'spongebob.squarepants@example.com',
		participantOhipFirstName: 'Spongebob',
		participantOhipLastName: 'Squarepants',
		participantPhoneNumber: '6475555678',
		participantPreferredName: 'Spongebob',
		guardianName: 'Patrick Star',
		guardianPhoneNumber: '6475550001',
		guardianEmailAddress: 'patrick.star@example.com',
		guardianRelationship: 'Best Friend',
		keycloakId: '108c6200-6f6b-456b-a697-a83b6c55f7ea',
	},
	{
		id: 'cllgouzph000308l35o99',
		dateOfBirth: new Date('1954-04-29'),
		participantEmailAddress: 'jerry.seinfeld@example.com',
		participantOhipFirstName: 'Jerry',
		participantOhipLastName: 'Seinfeld',
		participantPhoneNumber: '6475559012',
		participantPreferredName: 'Jerry',
		keycloakId: 'd88ddc30-93d5-4a57-b229-cbcaa715c3fc',
	},
];

const clinicianInvites: Prisma.ClinicianInviteCreateInput[] = [
	{
		id: 'clmarsvhd000008jngksv',
		participantOhipFirstName: 'Batman',
		participantOhipLastName: 'Wayne',
		participantEmailAddress: 'bruce.wayne1@example.com',
		participantPhoneNumber: '6475558123',
	},
	{
		id: 'clmarsvhd000008jngksa',
		participantOhipFirstName: 'Homer',
		participantOhipLastName: 'Simpson',
		participantEmailAddress: 'bruce.wayne2@example.com',
		participantPhoneNumber: '6475558123',
	},
	{
		id: 'clmarsvhd000008jngksb',
		participantOhipFirstName: 'Tim',
		participantOhipLastName: 'Drake',
		guardianName: 'Bruce Wayne',
		guardianPhoneNumber: '6475558123',
		guardianEmailAddress: 'bruce.wayne3@example.com',
		guardianRelationship: 'Stepfather',
		// TEMP remove after #480
		participantEmailAddress: 'bruce.wayne6@example.com',
		participantPhoneNumber: '6475558123',
	},
	{
		id: 'clmarsvhd000008jngksc',
		participantOhipFirstName: 'Tim',
		participantOhipLastName: 'Drake',
		guardianName: 'Bruce Wayne',
		guardianPhoneNumber: '6475558123',
		guardianEmailAddress: 'bruce.wayne4@example.com',
		guardianRelationship: 'Stepfather',
		// TEMP remove after #480
		participantEmailAddress: 'bruce.wayne8@example.com',
		participantPhoneNumber: '6475558123',
	},
	{
		id: 'clmarsvhd000008jngksd',
		participantOhipFirstName: 'Tim',
		participantOhipLastName: 'Drake',
		guardianName: 'Bruce Wayne',
		guardianPhoneNumber: '6475558123',
		guardianEmailAddress: 'bruce.wayn9e@example.com',
		guardianRelationship: 'Stepfather',
		// TEMP remove after #480
		participantEmailAddress: 'bruce.wayne7@example.com',
		participantPhoneNumber: '6475558123',
	},
];

export { participants, clinicianInvites };
