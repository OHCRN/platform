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

'use client';

import urlJoin from 'url-join';
import { useEffect, useState } from 'react';

import Button from 'src/components/common/Button';
import { useAppConfigContext } from 'src/components/providers/AppConfigContextProvider';

const ConsentButton = () => {
	const appConfig = useAppConfigContext();
	const [isComplete, setIsComplete] = useState<boolean>(false);

	useEffect(() => {
		const url = urlJoin(appConfig.CONSENT_API_URL, 'consent-completion');
		fetch(url, { cache: 'no-store' })
			.then((res) => res.json())
			.then((data) => setIsComplete(data.status === 'COMPLETE'))
			.catch((e: Error) => {
				console.log(e);
				setIsComplete(false);
				return false;
			});
	}, [appConfig.CONSENT_API_URL]);

	return (
		<Button variant={isComplete ? 'secondary' : 'primary'} color="green" onClick={() => {}}>
			{isComplete ? 'Download Consent PDF' : 'Complete Consent Forms'}
		</Button>
	);
};

export default ConsentButton;
