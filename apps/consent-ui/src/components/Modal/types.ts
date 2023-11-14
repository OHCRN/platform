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

import Button from '../Button';
import LinkButton from '../Button/LinkButton';

export type ModalConfig = {
	title?: React.ReactNode;
	message?: React.ReactNode;
	actionButtonText?: React.ReactNode;
	actionDisabled?: boolean;
	cancelButtonText?: React.ReactNode;
	cancelDisabled?: boolean;
	onActionClick?: React.ComponentProps<typeof Button>['onClick'];
	actionLink?: React.ComponentProps<typeof LinkButton>['href'];
	onCancelClick?: React.ComponentProps<typeof Button>['onClick'];
	cancelLink?: React.ComponentProps<typeof LinkButton>['href'];
};

export type ModalContext = {
	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
	setConfig: React.Dispatch<React.SetStateAction<ModalConfig>>;
};

// this is only used as a default value for the ModalContext if no ModalContext.Provider exists, so
// its value is only useful for debugging, see the docs: https://react.dev/reference/react/createContext#parameters
export const defaultModalContext = {
	setIsOpen: () => {},
	setConfig: () => {},
};
