const sql = `
SELECT sg.smpp_gateway_sid, sg.voip_carrier_sid, sg.ipv4, sg.port, sg.is_primary, sg.use_tls,  
vc.name, vc.account_sid, vc.service_provider_sid   
FROM smpp_gateways sg, voip_carriers vc
WHERE sg.voip_carrier_sid = vc.voip_carrier_sid
AND vc.is_active = 1 
AND vc.smpp_inbound_system_id = ? 
AND vc.smpp_inbound_password = ?  
`;

/**
 * Lookup the smpp gateways by smpp system_id and password
 * @param {*} pool
 * @param {*} logger
 */
async function lookupSmppGatewaysByBindCreds(pool, logger, system_id, password) {
  const pp = pool.promise();
  const [r] = await pp.execute({sql, nestTables: true}, [system_id, password]);
  return r;
}

module.exports = lookupSmppGatewaysByBindCreds;
