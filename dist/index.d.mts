import React from 'react';

type CompKv = {
    [key: string]: React.FC<any> | any;
};
interface CompData {
    name: string;
    properties: any;
}
declare function renderRoot({ rootKey, compKv, data, }: {
    rootKey?: string;
    compKv: CompKv;
    data: CompData[];
}): React.ReactElement;

export { renderRoot };
