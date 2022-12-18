// SPDX-License-Identifier: MIT

import React, { useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Form } from '@douyinfe/semi-ui';

import { AppContext } from '@dashboard/App';
import { useLocale } from '@dashboard/locales';
import { AsyncResourceForm } from '@dashboard/AsyncForm';
import { AsyncFormSelect } from '@dashboard/AsyncSelect';
import { mapToSelectOptions, rules } from '@dashboard/utils';

import { Admin, getSexes, getStates, loadGroupsSelectOptions } from './types';

const initValues: Partial<Admin> = {
    sex: 'unknown',
    state: 'normal'
};

export function Edit() {
    const ctx = useContext(AppContext);
    const nav = useNavigate();
    const locale = useLocale();
    const ps = useParams();
    const id = ps?.id ? parseInt(ps?.id) : 0;
    const sexes = getSexes(locale);
    const states = getStates(locale);

    const before = (vals: Partial<Admin>, id?: number):Partial<Admin> =>{
        delete vals.id;
        if (id !== 0) {
            delete vals.username;
        }
        return vals;
    };

    const back = ()=>nav('/admins');

    const actions = <Button onClick={back}>{locale.common.back}</Button>;

    return <AsyncResourceForm id={id > 0 ? id : undefined}
        style={{maxWidth: '500px', margin: 'auto'}}
        actions={actions}
        initValues={initValues}
        url='/admins'
        modifyMethod='PATCH'
        beforeSave={before}
        afterSave={()=>nav('/admins')}
    >
        <Form.Input readonly={id===0} label={locale.common.username} field='username' rules={[rules.required(locale)]} />
        <Form.Input label={locale.common.nickname} field='nickname' rules={[rules.required(locale)]} />
        <Form.Input label={locale.common.name} field='name' rules={[rules.required(locale)]} />
        <Form.Select label={locale.common.state} field='state' optionList={mapToSelectOptions(states)} rules={[rules.required(locale)]} />
        <Form.Select label={locale.common.sex} field='sex' optionList={mapToSelectOptions(sexes)} rules={[rules.required(locale)]} />
        <AsyncFormSelect label={locale.admin.group} field='group' loadOptions={()=>loadGroupsSelectOptions(ctx)} rules={[rules.required(locale)]} />
    </AsyncResourceForm>;
}
