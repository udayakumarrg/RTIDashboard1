import { AgentDetailsViewModel } from './agnetDetailsView.model';

export class PoliciesViewModel {
    public policyNumber: string = null;
    public policyType: string = null;
    public zipCode: string = null;
    public state: string = null;
    public agentDetails: AgentDetailsViewModel[];
}
