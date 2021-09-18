<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Validator;
use Exception;

class BitcoinController extends Controller
{

	public function btc()
    {
		// pega o link dos jsons
		$currencies = json_decode(file_get_contents(asset('storage/json/currencies.json'), false), true); 
		$json = json_decode(file_get_contents('https://api.coindesk.com/v1/bpi/currentprice.json', false), true); 

		if(isset($json)){

			// guardo os dados de coindesk em data
			$data = $json;
			$databpidollar = $data['bpi']['USD']['rate'];
			$databpidollarf = $data['bpi']['USD']['rate_float'];

			// limpa array bpi
			$data['bpi'] = [];
			
			// captura os dados do json currencies
			if(isset($currencies)){
				
				$brl = (float) $currencies['BRL'];;
				$euro = (float) $currencies['EUR'];;
				$cad = (float) $currencies['CAD'];;

			} else {

				$brl = 5.400;
				$euro = 0.920;
				$cad = 1.440;

			}

			// calcula os campos
			$btc = $databpidollarf;

			$freal = $brl * $btc;
			$feuro = $euro * $btc;
			$fcad = $cad * $btc;

			// prepara os nós do array
			$USD['USD'] = [
				'code' => 'USD',
				'rate' => $databpidollar,
				'description' => 'United States Dollar',
				'rate_float' => $databpidollarf
			];

			$BRL['BRL'] = [
				'code' => 'BRL',
				'rate' => number_format($freal,2),
				'description' => 'Brazilian Real',
				'rate_float' => $freal
			];

			$EUR['EUR'] = [
				'code' => 'EUR',
				'rate' => number_format($feuro,2),
				'description' => 'Euro',
				'rate_float' => $feuro
			];

			$CAD['CAD'] = [
				'code' => 'CAD',
				'rate' => number_format($fcad,2),
				'description' => 'Canadian Dollar',
				'rate_float' => $fcad
			];

			$BTC['BTC'] = [
				'code' => 'BTC',
				'rate' => '1.0000',
				'description' => 'Bitcoin',
				'rate_float' => 1
			];

			// adiciona os items ao nó bpi
			$data['bpi'] = $USD + $BRL + $EUR + $CAD + $BTC;

			// retorna os dados
			return response()->json($data, 200, ['Content-Type' => 'application/json;charset=UTF-8', 'Charset' => 'utf-8'],JSON_UNESCAPED_UNICODE);

		} else {
			// checa se ocorreu um erro
			return response()->json(['message' => 'Error'], 400);
		}		
			// retorna erro senao conseguir ler o json
			return response()->json(['message' => 'Error'], 400);
	
	}

	public function updatebtc(Request $request)
    {

		$items = array('BRL','EUR','CAD');
  		
		$data = $request->all();
		$authorization = $request->header('Authorization');

        if (!$authorization) {
			// checa se o token existe
			return response()->json(['message' => 'Token inválido'], 401, ['Content-Type' => 'application/json;charset=UTF-8', 'Charset' => 'utf-8'],JSON_UNESCAPED_UNICODE);
		}
		else if (empty($data['value'])) {
			// checa se é inteiro
			return response()->json(['message' => 'Valor vazio'], 400, ['Content-Type' => 'application/json;charset=UTF-8', 'Charset' => 'utf-8'],JSON_UNESCAPED_UNICODE);
		} 
		else if (!is_numeric($data['value'])) {
			// checa se é inteiro
			return response()->json(['message' => 'Valor inválido'], 400, ['Content-Type' => 'application/json;charset=UTF-8', 'Charset' => 'utf-8'],JSON_UNESCAPED_UNICODE);
		} 
		else if (!in_array($data['currency'], $items)) {
			// checa se existe no array (BRL, EUR e CAD)
			return response()->json(['message' => 'Moeda inválida'], 400, ['Content-Type' => 'application/json;charset=UTF-8', 'Charset' => 'utf-8'],JSON_UNESCAPED_UNICODE);			
		}
		else {
			// mostra a confirmacao da alteracao
			return $this->alterajson($data);
		}
	
	}

	public function alterajson($data) {

		if ($data) {

			// captura json currencies
			$path = asset('storage/json/currencies.json'); 
			$arquivo = json_decode(file_get_contents($path, false), true); 

			if(isset($arquivo)){

				// guarda os dados do item em datanew
				$datanew = $arquivo;
				$datanew[$data['currency']] = $data['value'];

				// atualiza o arquivo json currencies
				$caminho_arquivo = getcwd() . DIRECTORY_SEPARATOR . "/storage/json" . DIRECTORY_SEPARATOR . 'currencies.json';
				$novoarq = json_encode($datanew);
				file_put_contents($caminho_arquivo, $novoarq);

				// retorna mensagem positiva
				return response()->json(['message' => 'Valor alterado com sucesso!'], 200, ['Content-Type' => 'application/json;charset=UTF-8', 'Charset' => 'utf-8'],JSON_UNESCAPED_UNICODE);
			}

			return response()->json(['message' => 'Ocorreu um erro!'], 400, ['Content-Type' => 'application/json;charset=UTF-8', 'Charset' => 'utf-8'],JSON_UNESCAPED_UNICODE);
		}


	}

	public function login(request $request)
    {

		$data = $request->all();

		// usa o validator do laravel para verificar os dados do request
		$validator = Validator::make($data, 
		[
			'email' => 'required|email',
			'password' => 'required|digits_between:6,6'
        ]
		);
		
		if ($validator->fails()) {
			//mensagem de erro;
			return response()->json(['message' => 'Campos inválidos'],400, ['Content-Type' => 'application/json;charset=UTF-8', 'Charset' => 'utf-8'],JSON_UNESCAPED_UNICODE);
		} else {
			//retorna o token;
			return response()->json(['token' => $this->generateRandomString() ],200, ['Content-Type' => 'application/json;charset=UTF-8', 'Charset' => 'utf-8'],JSON_UNESCAPED_UNICODE);
		}
	
	}

	function generateRandomString($length = 16) {
		//gera o token com letras e numeros ate 16 digitos;
		$characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
		$charactersLength = strlen($characters);
		$randomString = '';
		for ($i = 0; $i < $length; $i++) {
			$randomString .= $characters[rand(0, $charactersLength - 1)];
		}
		return $randomString;
	}

}
