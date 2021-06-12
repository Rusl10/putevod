<?php
	// Подключаем файлы плагина
	use PHPMailer\PHPMailer\PHPMailer;
	use PHPMailer\PHPMailer\Exception;

	require 'phpmailer/src/Exception.php';
	require 'phpmailer/src/PHPMailer.php';
	// Объявляем сам плагин
	$mail = new PHPMailer(true);
	$mail->CharSet = 'UTF-8';
	$mail->setLanguage('ru', 'phpmailer/language/');
	// Поддержка HTML тегов в письме
	$mail->IsHTML(true);

	//От кого письмо - почта должна быть привязана к домену
	$mail->setFrom('mail@ruslan-dasaev.ru', 'Фрилансер по природе');
	// Кому отправить
	$mail->addAddress('ruslan-website@mail.ru');
	// Тема письма
	$mail->Subject = 'Заявка с путевода!';

	//Рука
	//Если есть input-radio - делаем выбор
	$hand = "Правая";
	if($_POST['hand'] == "left"){
		$hand = "Левая";
	}

	// Тело письма. Добавляем доп. поля, если это предусмотрено формой.

	$body = '<h1>Встречай меня! Я письмо!</h1>';

	if (trim(!empty($_POST['name']))) {
		$body.='<p><strong>Имя:</strong> '.$_POST['name'].'</p>';
	}
	if (trim(!empty($_POST['phone']))) {
		$body.='<p><strong>Телефон:</strong> '.$_POST['phone'].'</p>';
	}
	if (trim(!empty($_POST['select']))) {
		$body.='<p><strong>Вариан полета:</strong> '.$_POST['select'].'</p>';
	}
	if (trim(!empty($_POST['email']))) {
		$body.='<p><strong>E-mail:</strong> '.$_POST['email'].'</p>';
	}
	if (trim(!empty($_POST['hand']))) {
		$body.='<p><strong>Рука:</strong> '.$hand.'</p>';
	}
	if (trim(!empty($_POST['age']))) {
		$body.='<p><strong>Возраст:</strong> '.$_POST['age'].'</p>';
	}
	if (trim(!empty($_POST['message']))) {
		$body.='<p><strong>Сообщение:</strong> '.$_POST['message'].'</p>';
	}

	// Прикрепить файл

	if (!empty($_FILES['image']['tmp_name'])) {
		//путь загрузки файла

		$filePath = __DIR__ . "/files/" . $_FILES['image']['name'];

		//грузим файл
		// В условии копируем его на сервер в папку и 
		// если это удалось, то добавляем в плагин сам файл
		if (copy($_FILES['image']['tmp_name'], $filePath)) {
			$fileAttach = $filePath;
			$body.='<p><strong>Фото в приложении</strong></p>';
			$mail->addAttachment($fileAttach);
		}
	}

	$mail->Body = $body;

	//Отправляем
	// Если форма не отправилась, то
	if (!$mail->send()) {
		$message = 'Ошибка';
	} else {
		$message = 'Данные отправлены!';
	}
	// Формируем json из нашего сообщения для отправки на фронт пользователю
	$response = ['message' => $message];

	header('Content-type: application/json');
	echo json_encode($response);

?>	