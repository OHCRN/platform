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

import * as z from 'zod';

const GENETICS_CLINIC = [
	'CHILDRENS_HOSPITAL_OF_EASTERN_ONTARIO_OTTAWA',
	'GRAND_RIVER_HOSPITAL_KITCHENER',
	'HAMILTON_HEALTH_SCIENCES_HAMILTON',
	'HEALTH_SCIENCES_NORTH_SUDBURY',
	'HOSPITAL_FOR_SICK_CHILDREN_TORONTO',
	'KINGSTON_HEALTH_SCIENCES_CENTRE_KINGSTON',
	'LAKERIDGE_HEALTH_OSHAWA',
	'LONDON_HEALTH_SCIENCES_CENTRE_LONDON',
	'MACKENZIE_HEALTH_RICHMOND_HILL',
	'NORTH_YORK_GENERAL_HOSPITAL_TORONTO',
	'ORILLIA_SOLDIERS_MEMORIAL_HOSPITAL_ORILLIA_SIMCOE_MUSKOKA',
	'PETERBOROUGH_REGIONAL_HEALTH_CENTRE_PETERBOROUGH',
	'PRINCESS_MARGARET_HOSPITAL_TORONTO',
	'SINAI_HEALTH_SYSTEM_TORONTO',
	'SUNNYBROOK_HEALTH_SCIENCES_TORONTO',
	'THUNDER_BAY_REGIONAL_HEALTH_SCIENCES_CENTRE_THUNDER_BAY',
	'TRILLIUM_HEALTH_PARTNERS_MISSISSAUGA',
	'WINDSOR_REGIONAL_HOSPITAL_WINDSOR',
	'WOMENS_COLLEGE_HOSPITAL_TORONTO',
] as const;

export const GeneticsClinic = z.enum(GENETICS_CLINIC);
export type GeneticsClinic = z.infer<typeof GeneticsClinic>;
