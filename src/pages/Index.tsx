import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import Icon from '@/components/ui/icon';

interface StepData {
  id: number;
  title: string;
  content: string;
  warning?: string;
  isCompleted: boolean;
}

const Index = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [credentials, setCredentials] = useState({ login: '', password: '' });
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [hasCredentials, setHasCredentials] = useState(false);

  // Извлечение логина и пароля из URL
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const login = urlParams.get('login') || '';
    const password = urlParams.get('password') || '';
    setCredentials({ login, password });
    setHasCredentials(Boolean(login && password));
  }, []);

  const steps: StepData[] = [
    {
      id: 1,
      title: "Ограничения",
      content: "СТРОГО ЗАПРЕЩЕНО ВХОДИТЬ В ПРОФИЛЬ СО СМАРТФОНА ИЛИ ПК! При попытке входа со стороннего устройства в выдаче будет отказано, без возврата средств.",
      warning: "Используйте только консоль для входа в аккаунт",
      isCompleted: completedSteps.includes(1)
    },
    {
      id: 2,
      title: "Пользователь",
      content: "На консоли откройте ⚙️ Системные настройки → Пользователь → Добавить пользователя → Создать нового пользователя. Выберите любые аватарку и ник, нажмите ОК.",
      isCompleted: completedSteps.includes(2)
    },
    {
      id: 3,
      title: "Вход",
      content: `Нажмите "Войти и установить связь". Когда появится QR, выберите "Другой способ для входа". Введите логин: ${credentials.login || '[будет показан в URL]'} и пароль: ${credentials.password || '[будет показан в URL]'}`,
      isCompleted: completedSteps.includes(3)
    },
    {
      id: 4,
      title: "Настройки",
      content: "Уточните у продавца код подтверждения и быстро введите его. Нажмите Далее → Связать → ОК. В разделе Пользователи выберите новый профиль и установите Настройки онлайн-лицензии в положение ВКЛ.",
      isCompleted: completedSteps.includes(4)
    },
    {
      id: 5,
      title: "Загрузка",
      content: "Вернитесь на 🏠 Домашнюю страницу. Откройте Виртуальные игровые карты → выберите добавленного пользователя → нажмите на игру → Параметры → Загрузить данные.",
      isCompleted: completedSteps.includes(5)
    },
    {
      id: 6,
      title: "Памятка",
      content: "Игры запускаются только с интернетом. СРАЗУ после запуска игры включайте режим полёта! Не меняйте данные профиля. Несоблюдение может привести к слёту аккаунта.",
      warning: "Обязательно включайте режим полёта после запуска игры",
      isCompleted: completedSteps.includes(6)
    }
  ];

  const toggleStepCompletion = (stepId: number) => {
    setCompletedSteps(prev => 
      prev.includes(stepId) 
        ? prev.filter(id => id !== stepId)
        : [...prev, stepId]
    );
  };

  // Прогресс основан на текущем шаге
  const progress = (currentStep / steps.length) * 100;

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Если нет данных в URL, показываем экран приветствия
  if (!hasCredentials) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <Card className="max-w-md w-full mx-4 bg-gray-800 border-gray-700">
          <CardHeader className="text-center">
            <img 
              src="https://cdn.poehali.dev/files/1f2f71c9-9139-41ea-b95a-6f66419d9cc0.png" 
              alt="Сундук" 
              className="w-16 h-16 object-contain mx-auto mb-4 rounded-xl"
            />
            <CardTitle className="text-2xl text-white">Добро пожаловать!</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-300 text-center">
              Для использования инструкции необходимо передать данные для входа в аккаунт через URL.
            </p>
            <Alert className="bg-blue-900 border-blue-700">
              <Icon name="Info" size={16} className="text-blue-400" />
              <AlertDescription className="text-blue-200">
                <strong>Как передать данные:</strong><br/>
                Добавьте к URL параметры:<br/>
                <code className="text-sm bg-gray-700 text-gray-200 px-2 py-1 rounded">
                  ?login=ваш_логин&password=ваш_пароль
                </code>
              </AlertDescription>
            </Alert>
            <div className="bg-amber-900 p-4 rounded-lg border border-amber-700">
              <h4 className="font-medium text-amber-200 mb-2">Пример ссылки:</h4>
              <code className="text-xs bg-gray-700 text-gray-200 p-2 rounded block border border-gray-600 break-all">
                {window.location.origin}?login=example@email.com&password=mypassword123
              </code>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <div className="bg-gray-800 shadow-sm border-b border-gray-700">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center gap-4">
            <img 
              src="https://cdn.poehali.dev/files/d999ba6f-46bf-441b-811e-ff477b47f708.png" 
              alt="Сундук" 
              className="w-12 h-12 object-contain rounded-lg"
            />
            <div>
              <h1 className="text-2xl font-bold text-white">Инструкция по активации</h1>
              <p className="text-gray-300">Магазин игровых аккаунтов "Сундук"</p>
            </div>
          </div>
          
          <div className="mt-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-300">Прогресс выполнения</span>
              <span className="text-sm text-gray-400">Шаг {currentStep} из {steps.length}</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-8">

        {/* Navigation Cards */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <Card className="bg-gray-800 border-gray-600 hover:border-gray-500 transition-colors">
            <Button
              variant="ghost"
              onClick={prevStep}
              disabled={currentStep === 1}
              className="w-full h-full p-6 text-white hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <div className="flex items-center justify-center gap-3">
                <Icon name="ChevronLeft" size={20} />
                <span className="font-medium">Назад</span>
              </div>
            </Button>
          </Card>
          
          <Card className="bg-gray-800 border-gray-600 hover:border-amber-500 transition-colors">
            <Button
              variant="ghost"
              onClick={nextStep}
              disabled={currentStep === steps.length}
              className="w-full h-full p-6 text-white hover:bg-amber-900 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <div className="flex items-center justify-center gap-3">
                <span className="font-medium">Вперед</span>
                <Icon name="ChevronRight" size={20} />
              </div>
            </Button>
          </Card>
        </div>

        {/* Current Step Content */}
        <div>
          <Card className="animate-fade-in bg-gray-800 border-gray-700 min-h-[400px] flex flex-col">
            <CardHeader>
              <CardTitle className="text-2xl text-white">
                Шаг {currentStep}: {steps.find(s => s.id === currentStep)?.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 flex-1 flex flex-col">
              {steps.find(s => s.id === currentStep)?.warning && (
                <Alert className="border-red-700 bg-red-900">
                  <Icon name="AlertTriangle" size={16} className="text-red-400" />
                  <AlertDescription className="text-red-200">
                    {steps.find(s => s.id === currentStep)?.warning}
                  </AlertDescription>
                </Alert>
              )}
              
              <div className="prose max-w-none flex-1">
                <p className="text-gray-200 leading-relaxed text-lg">
                  {steps.find(s => s.id === currentStep)?.content}
                </p>
              </div>

              {/* Credentials Display */}
              {currentStep === 3 && (credentials.login && credentials.password) && (
                <Card className="bg-amber-900 border-amber-700">
                    <CardContent className="pt-6">
                      <h4 className="font-medium mb-4 text-amber-200 text-lg">Ваши данные для входа:</h4>
                      <div className="space-y-3">
                        <div className="flex flex-col gap-2">
                          <span className="font-medium text-amber-300 text-sm">Логин:</span>
                          <code className="bg-gray-700 text-gray-200 px-3 py-2 rounded text-base border border-gray-600 font-mono break-all">{credentials.login}</code>
                        </div>
                        <div className="flex flex-col gap-2">
                          <span className="font-medium text-amber-300 text-sm">Пароль:</span>
                          <code className="bg-gray-700 text-gray-200 px-3 py-2 rounded text-base border border-gray-600 font-mono break-all">{credentials.password}</code>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}


            </CardContent>
          </Card>
        </div>
      </div>

      {/* Fixed Support Button */}
      <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
        <Button
          asChild
          className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg px-6 py-3 rounded-full"
        >
          <a
            href="https://t.me/lahtion0v"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2"
          >
            <Icon name="MessageCircle" size={18} />
            Поддержка в ТГ
          </a>
        </Button>
      </div>
    </div>
  );
};

export default Index;