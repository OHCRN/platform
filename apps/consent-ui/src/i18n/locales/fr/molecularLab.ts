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

import { MolecularLabDictionary } from '../en/molecularLab';

const dictionary = {
	CHILDRENS_HOSPITAL_OF_EASTERN_ONTARIO_OTTAWA: "Children's Hospital of Eastern Ontario, Ottawa",
	HAMILTON_HEALTH_SCIENCES_HAMILTON: 'Hamilton Health Sciences, Hamilton',
	HOSPITAL_FOR_SICK_CHILDREN_TORONTO: 'Hospital For Sick Children, Toronto',
	KINGSTON_HEALTH_SCIENCES_CENTRE_KINGSTON: 'Kingston Health Sciences Centre, Kingston',
	LONDON_HEALTH_SCIENCES_CENTRE_LONDON: 'London Health Sciences Centre, London',
	NORTH_YORK_GENERAL_HOSPITAL_TORONTO: 'North York General Hospital, Toronto',
	SINAI_HEALTH_SYSTEM_TORONTO: 'Sinai Health System, Toronto',
	TRILLIUM_HEALTH_PARTNERS_MISSISSAUGA: 'Trillium Health Partners, Mississauga',
	UNIVERSITY_HEALTH_NETWORK_TORONTO: 'University Health Network, Toronto',
} satisfies MolecularLabDictionary;

export default dictionary;
