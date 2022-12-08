// SPDX-License-Identifier: MIT

import React, { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Divider, Form } from "@douyinfe/semi-ui";

import { AppContext } from "@dashboard/App/context";
import { useLocale } from "@dashboard/locales";
import { AsyncForm } from "@dashboard/AsyncForm";
import { AsyncFormSelect } from "@dashboard/AsyncSelect";
import { mapToSelectOptions } from "@dashboard/utils";
import { Return } from "@dashboard/App/context/api";

import { Admin, getSexes, getStates, loadGroupsSelectOptions } from './types';

export function Edit() {
    const ctx = useContext(AppContext);
    const nav = useNavigate();
    const locale = useLocale();
    const ps = useParams();
    const id = ps?.id ? parseInt(ps?.id) : 0;
    const sexes = getSexes(locale);
    const states = getStates(locale);

    const init = async(): Promise<Partial<Admin>> =>{
        if (id == 0) {
            return {
                sex: 'unknown',
                state: 'normal'
            };
        }

        const r = await ctx.get(`/admins/${id}`);
        if (!r.ok) {
            throw r.problem?.title;
        }
        return r.body as Admin;
    };

    const submit = async(vals: Partial<Admin>)=>{
        delete vals.id;
        let r: Return;
        if (id) {
            delete vals.username;
            r = await ctx.patch(`/admins/${id}`, vals);
        } else {
            r = await ctx.post(`/admins`, vals);
        }

        if (!r.ok) {
            return r.problem;
        }
        nav('/admins');
    };

    return <div>
        <AsyncForm style={{maxWidth: '550px', margin: 'auto'}} onSubmit={submit} onInit={init}>
            <Form.Input readonly={id>0} label={locale.common.username} field='username' />
            <Form.Input label={locale.common.nickname} field='nickname' />
            <Form.Input label={locale.common.name} field='name' />
            <Form.Select label={locale.common.state} field='state' optionList={mapToSelectOptions(states)} />
            <Form.Select label={locale.common.sex} field='sex' optionList={mapToSelectOptions(sexes)} />
            <AsyncFormSelect label={locale.admin.group} field='group' loadOptions={()=>loadGroupsSelectOptions(ctx)} />

            <Divider style={{margin: '10px 0'}} />
            <div className="cmfx-actions">
                <Button htmlType="button" type="tertiary" onClick={()=>nav(-1)}>{locale.common.back}</Button>
                <Button htmlType="submit" type="primary">{locale.common.save}</Button>
            </div>
        </AsyncForm>
    </div>;
}
