import { AgentDetailsViewModel } from './agentDetailsViewModel'

export class PoliciesViewModel {
    public policyNumber: string = null;
    public policyType: string = null;
    public zipCode: string = null;
    public state: string = null;
    public agentDetails: AgentDetailsViewModel[];
}
