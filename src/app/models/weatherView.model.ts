class MetaData {
    skip: number;
    top: number;
    count: number;
    filter: string[];
    format: string;
    orderedBy: any;
    select: any;
    entityName: string;
    url: string[];
}

export class DisasterDeclarationsSummaries {
    public disasterNumber = 0;
    public ihProgramDeclared =	false;
    public iaProgramDeclared = false;
    public paProgramDeclared = false;
    public hmProgramDeclared = false;
    public state: string = null;
    public declarationDate: string = null;
    public fyDeclared = 0;
    public disasterType: string = null;
    public incidentType: string = null;
    public title: string = null;
    public incidentBeginDate: string = null;
    public incidentEndDate: string = null;
    public disasterCloseOutDate: string = null;
    public declaredCountyArea: string = null;
    public placeCode: string = null;
    public hash: string = null;
    public lastRefresh: string = null;
    public id: string = null;
}

export class WeatherViewModel {
    metaData: MetaData;
    DisasterDeclarationsSummaries: DisasterDeclarationsSummaries[];
}
