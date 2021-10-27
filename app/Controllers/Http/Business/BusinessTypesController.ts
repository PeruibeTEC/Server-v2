import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import BusinessType from 'App/Models/BusinessType';

export default class BusinessTypesController {
  public async create({
    request,
    response,
  }: HttpContextContract): Promise<Response | void> {
    const { name } = request.only(['name']);

    const businessTypeVerify = await BusinessType.findBy('name', name);

    if (businessTypeVerify) {
      return response.status(400).send({ error: 'This name is not valid' });
    }

    const businessType = await BusinessType.create({
      name,
    });

    return response.status(201).send(businessType);
  }

  public async show({
    request,
    response,
  }: HttpContextContract): Promise<Response | void> {
    const { id } = request.params();
    const businessType = await BusinessType.findBy('id', id);
    if (!businessType) {
      return response
        .status(404)
        .send({ error: 'This business type id is not valid' });
    }
    return response.status(200).send(businessType);
  }

  public async index({
    response,
  }: HttpContextContract): Promise<Response | void> {
    const businessTypes = await BusinessType.query().select('id', 'name');

    return response.status(200).send(businessTypes);
  }

  public async delete({
    request,
    response,
  }: HttpContextContract): Promise<Response | void> {
    const { id } = request.only(['id']);

    const verifyBusinessTypeId = await BusinessType.findBy('id', id);

    if (!verifyBusinessTypeId) {
      return response
        .status(404)
        .send({ error: 'This business type id is not valid' });
    }

    await BusinessType.query().where('id', id).delete();

    return response.status(200).send({ success: 'Business Type deleted' });
  }

  public async update({
    request,
    response,
  }: HttpContextContract): Promise<Response | void> {
    const { id } = request.only(['id']);
    const verifyBusinessTypeId = await BusinessType.findBy('id', id);

    if (!verifyBusinessTypeId) {
      return response
        .status(404)
        .send({ error: 'This business type id is not valid' });
    }

    const { name } = request.only(['name']);
    const verifyBusinessTypeName = await BusinessType.findBy('name', name);

    if (verifyBusinessTypeName) {
      return response
        .status(404)
        .send({ error: 'This business type name is not valid' });
    }

    await BusinessType.query().where('id', id).update({
      name,
    });

    return response.status(200).send({ success: 'Business Type updated' });
  }
}
