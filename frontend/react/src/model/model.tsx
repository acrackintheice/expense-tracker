import { SemanticICONS } from "semantic-ui-react/dist/commonjs/generic";

export interface Expense {
    id: bigint,
    location: string,
    date: Date,
    tag: Tag,
    cost: string    
}

export interface Tag {
    tag_id: bigint,
    icon: SemanticICONS,
    name: string    
}